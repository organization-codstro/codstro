import { Fortune } from "../../types/Mbit/Mbit";


export const fortunes: Fortune[] = [
  {
    id: 1,
    code: 100,
    name: 'Continue',
    summary: "It's okay to take a short break and then start again!",
    description: "A 100 means the request has started and the client can continue. In other words, it signals that the work isn't finished yet. If you take a mid-day check and pause to catch your breath, unexpected ideas might pop up. Before committing, take another look at the code and say, 'Oh, let's take a break here!' with a smile.",
    categoryMessage: "Development: If you pause and review your code, you can find even the smallest bugs. 'Whew, at least I found it!'\nMeetings: Taking a short break to organize your notes will double your concentration after the meeting.\nLifestyle: Take a short walk today, grab a cup of coffee, and smile to yourself, 'Ah, that feels good!'",
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 2,
    code: 200,
    name: 'OK',
    summary: 'Everything is going smoothly. Keep up the good work!',
    description: "A 200 status means everything is working perfectly. Your request was successful, and the response is exactly what you expected. Today is your day - your code compiles, tests pass, and everything just clicks into place. It's the kind of day where you can tackle challenging problems with confidence.",
    categoryMessage: "Development: Perfect day for implementing new features or refactoring complex code. Your logic is sharp!\nMeetings: Your ideas will be well-received. Speak up and share your insights with confidence.\nLifestyle: Everything flows naturally today. Enjoy the momentum and celebrate small wins!",
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 3,
    code: 404,
    name: 'Not Found',
    summary: 'Sometimes getting lost leads to new discoveries.',
    description: "A 404 means the requested resource wasn't found. But getting lost isn't always bad - sometimes it leads you to discover something unexpected. Today might feel a bit disorienting, but stay curious. The path you're looking for might not exist, but perhaps you'll find an even better route.",
    categoryMessage: "Development: If you can't find the solution, try a different approach. Sometimes the best answers come from unexpected places.\nMeetings: If the discussion goes off-track, don't worry. New perspectives often emerge from unexpected conversations.\nLifestyle: Embrace the uncertainty. Getting lost in a new coffee shop or taking a different route home might brighten your day.",
    color: 'from-yellow-400 to-orange-400'
  }
];
