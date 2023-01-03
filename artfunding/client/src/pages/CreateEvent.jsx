import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton, FormField, Loader } from "../components";
import { money } from "../assets";
import { useStateContext } from "../context";
import { ethers } from "ethers";
import { checkIfImage } from "../utils";

const CreateEvent = () => {
  const { createEvent } = useStateContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    title: "",
    desc: "",
    target: "",
    image: "",
  });
  const handleFormFieldChange = (fieldName, e) => {
    if (fieldName === "image") {
      setImage(e);
      const imageFile = e.target.files[0];
      // console.log(imageFile);
      setForm({ ...form, [fieldName]: URL.createObjectURL(imageFile) });
      // console.log(URL.createObjectURL(imageFile));
    } else {
      setForm({ ...form, [fieldName]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createEvent({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide image URL");
        setForm({ ...form, image: "" });
      }
    });

    console.log(form);
  };
  return (
    <div className="bg-[#48426d] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader label="Transaction is in progress" />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#312c51] rounded-[10px]">
        <h1 className="font-poppins font-bold sm:text-[25px] text-[18px] leading-[38px] text-[#f0c38e]">
          Create Artwork
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            label="Name *"
            placeholder="Enter your name"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            label="Title *"
            placeholder="Enter title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          label="Story *"
          placeholder="Enter description"
          value={form.desc}
          isTextArea
          handleChange={(e) => handleFormFieldChange("desc", e)}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#f1aa9b] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-poppins font-bold text-[25px] text-[#312c51] ml-[20px]">
            You will get 100% of raised amount
          </h4>
        </div>

        {/* <div className="flex flex-wrap gap-[40px]"> */}
        <FormField
          label="Goal *"
          placeholder="ETH 0.50"
          inputType="number"
          value={form.target}
          handleChange={(e) => handleFormFieldChange("target", e)}
        />
        <FormField
          label="Image *"
          placeholder="Enter image URL"
          inputType="file"
          accept="image/*"
          handleChange={(e) => handleFormFieldChange("image", e)}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType={"submit"}
            title="Submit"
            styles="bg-[#f0c38e] px-[50px]"
          />
        </div>
        {/* </div> */}
      </form>
    </div>
  );
};
export default CreateEvent;
