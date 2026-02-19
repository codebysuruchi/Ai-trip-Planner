export const SelectTravelersList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A solo travels in exploration',
    icon: '🙂',
    people: '1 Person',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travels in tandem',
    icon: '👫',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: '🧑‍🤝‍🧑',
    people: '5 to 10 People',
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '🪙',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💵',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Dont worry about cost',
    icon: '💳',
  },
];

// you can use this in the OpenAI prompt or similar
// export const AI_PROMPT =
//   'Generate Travel Plan for Location : {location} \n Number of Travelers : {travelers} \n Budget : {budget} \n Duration : {duration} days \n The plan should include day-wise itinerary with activities, places to visit, and dining options. Ensure the plan is engaging, informative, and tailored to the specified number of travelers and budget. Provide recommendations for accommodations and transportation as well. Format the response in a clear and organized manner.';

export const AI_PROMPT = `
You are a JSON API.

Return ONLY valid JSON.

{
  "Hotels": [
    {
      "name": "",
      "address": "",
      "price": "",
      "imageUrl": "",
      "rating": ""
    }
  ],
  "Itinerary": [
    {
      "day": "",
      "placesToVisit": [
        {
          "name": "",
          "time": "Provide exact time in 12-hour format like 9:00 AM, 2:30 PM. Do NOT use Morning/Afternoon/Evening.",
          "description": "",
          "imageUrl": "",
          "timeToTravel":"provide time duration to travel ,example: 30 mins, 45 mins, 1 hour"
        }
      ]
    }
  ]
}

Location: {location}
Duration: {duration} Days
Travelers: {travelers}
Budget: {budget}
`;