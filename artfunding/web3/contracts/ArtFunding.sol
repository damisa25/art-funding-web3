// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ArtFunding {
    struct Event {
        address owner;
        string title;
        string desc;
        uint256 target;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Event) public events;

    uint256 public numberOfEvents = 0;

    function createEvent(address _owner,
        string memory _title,
        string memory _desc,
        uint256 _target,
        string memory _image) public returns (uint256) {

        Event storage myevent = events[numberOfEvents];

        myevent.owner = _owner;
        myevent.title = _title;
        myevent.desc = _desc;
        myevent.target = _target;
        myevent.amountCollected = 0;
        myevent.image = _image;

        numberOfEvents++;

        return numberOfEvents - 1;
    }

    function donateEvent(uint256 _id) public payable {
        uint256 amount = msg.value;

        Event storage donatedEvent = events[_id];

        donatedEvent.donators.push(msg.sender);
        donatedEvent.donations.push(amount);

        (bool sent,) = payable(donatedEvent.owner).call{value: amount}("");

        if(sent){
            donatedEvent.amountCollected = donatedEvent.amountCollected + amount;
        }

    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (events[_id].donators, events[_id].donations);
    }

    function getEvents() public view returns(Event[] memory){
        Event[] memory allEvents = new Event[](numberOfEvents);

        for (uint i = 0; i < numberOfEvents; i++) {
            Event storage item = events[i];

            allEvents[i] = item;
        }

        return allEvents;
    }
}