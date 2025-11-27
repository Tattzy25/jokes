export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category } = req.body;

  // Adult joke and roast database - fun, flirty, edgy but not hateful
  const jokes = {
    default: [
      "I'm not saying you're old, but your birth certificate is written in hieroglyphics.",
      "You're like a cloud. When you disappear, it's a beautiful day.",
      "I'd agree with you, but then we'd both be wrong.",
      "You're not stupid; you just have bad luck thinking.",
      "If I wanted to kill myself, I'd climb your ego and jump to your IQ.",
      "You bring everyone so much joy... when you leave.",
      "I'm jealous of people who don't know you.",
      "You're proof that evolution CAN go in reverse.",
      "Somewhere out there is a tree producing oxygen for you. You owe it an apology.",
      "I'd explain it to you, but I left my crayons at home."
    ],
    roast: [
      "You're the reason the gene pool needs a lifeguard.",
      "If laughter is the best medicine, your face must be curing the world.",
      "You're like a software update – when I see you, I think 'not now.'",
      "I'm not insulting you, I'm describing you.",
      "You're the human equivalent of a participation award.",
      "You're so dense, light bends around you.",
      "I'd call you a tool, but that implies you're useful.",
      "You have an entire life to be an idiot. Why not take today off?",
      "You're about as useful as a screen door on a submarine.",
      "If you were any more inbred, you'd be a sandwich.",
      "You're like Monday – nobody likes you.",
      "I've seen salads with more personality than you."
    ],
    flirty: [
      "Are you a parking ticket? Because you've got 'fine' written all over you.",
      "Is your name Google? Because you have everything I've been searching for.",
      "Are you a campfire? Because you're hot and I want s'more.",
      "Do you believe in love at first sight, or should I walk by again?",
      "Are you a magician? Because whenever I look at you, everyone else disappears.",
      "If you were a vegetable, you'd be a cute-cumber.",
      "Is your dad a boxer? Because you're a knockout!",
      "Are you a bank loan? Because you've got my interest.",
      "Do you have a map? I just got lost in your eyes.",
      "Are you Wi-Fi? Because I'm feeling a connection.",
      "If beauty were time, you'd be an eternity.",
      "I must be a snowflake, because I've fallen for you."
    ],
    naughty: [
      "I'm not a weatherman, but you can expect a few inches tonight.",
      "Are you a light switch? Because you really turn me on.",
      "Is it hot in here, or is it just you?",
      "I'm like a Rubik's Cube – the more you play with me, the harder I get.",
      "Are you a drill sergeant? Because you've got my privates standing at attention.",
      "I'm not a photographer, but I can picture us together.",
      "Do you work at Subway? Because you just gave me a footlong.",
      "Are you a haunted house? Because I'm going to scream when I'm inside you.",
      "I'm no Fred Flintstone, but I can make your bed rock.",
      "Are you a guitar? Because I want to pluck your strings.",
      "I'm like a candy bar – half sweet, half nuts.",
      "Is your name Chapstick? Because you're da balm."
    ],
    savage: [
      "You're not pretty enough to be this dumb.",
      "I'd roast you, but my mom said I shouldn't burn trash.",
      "You look like you'd lose an argument with a mirror.",
      "You're the reason shampoo has instructions.",
      "If I had a face like yours, I'd sue my parents.",
      "You're like a broken condom – a complete accident.",
      "You're living proof that God has a sense of humor.",
      "I've met some pricks in my time, but you're a cactus.",
      "You're not the dumbest person alive, but you better hope they don't die.",
      "Mirrors can't talk. Lucky for you, they can't laugh either.",
      "You're so fake, Barbie is jealous.",
      "If I throw a stick, will you leave?"
    ],
    dark: [
      "I have a fish that can breakdance! Only for 20 seconds though, and only once.",
      "My grandfather has the heart of a lion... and a lifetime ban from the zoo.",
      "I have a joke about unemployed people, but none of them work.",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "I have a joke about chemistry, but I don't think it will get a reaction.",
      "Why don't scientists trust atoms? Because they make up everything!",
      "I'm reading a book about anti-gravity. It's impossible to put down.",
      "I told my psychiatrist I keep hearing voices. He told me I don't have a psychiatrist.",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "I used to think I was indecisive, but now I'm not so sure.",
      "I'm on a whiskey diet. I've lost three days already.",
      "My therapist says I have a preoccupation with vengeance. We'll see about that."
    ],
    kinky: [
      "I'm not into S&M, but I could make an exception for you.",
      "Are you a rope? Because I'm getting all tied up thinking about you.",
      "I'm like IKEA furniture – confusing at first, but fun to put together.",
      "Are you a beaver? Because daaaaam!",
      "I'm no electrician, but I can light up your night.",
      "Are you a mirror? Because I can see myself inside you.",
      "I'm not a genie, but I can make your dreams come true.",
      "Are you a firework? Because you're about to explode.",
      "I'm like a remote control – I know all the right buttons.",
      "Are you a banana? Because I find you a-peeling.",
      "I must be a keyboard, because you're just my type.",
      "Are you a tower? Because Eiffel for you."
    ],
    oneliners: [
      "I'm not lazy, I'm on energy-saving mode.",
      "I'm not arguing, I'm just explaining why I'm right.",
      "I'm not short, I'm concentrated awesome.",
      "I'm not weird, I'm limited edition.",
      "I'm not bossy, I just have better ideas.",
      "I'm not sarcastic, I'm just intelligent beyond your understanding.",
      "My bed and I have a special relationship – we're perfect for each other, but my alarm clock keeps trying to break us up.",
      "I'm not saying I hate you, but I would unplug your life support to charge my phone.",
      "I'm not insulting you, I'm describing you.",
      "I'm not a complete idiot, some parts are missing.",
      "I'm not clumsy, the floor just hates me.",
      "I'm not ignoring you, I'm just prioritizing my Netflix."
    ]
  };

  // Pre-compute combined arrays for better performance
  const allJokes = Object.values(jokes).flat();
  const roastAndSavage = [...jokes.roast, ...jokes.savage];
  const flirtyAndNaughty = [...jokes.flirty, ...jokes.naughty];

  // Determine which category to use
  let categoryJokes = jokes.default;
  if (category) {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('roast') || lowerCategory.includes('burn') || lowerCategory.includes('savage')) {
      categoryJokes = roastAndSavage;
    } else if (lowerCategory.includes('flirt') || lowerCategory.includes('dirty')) {
      categoryJokes = flirtyAndNaughty;
    } else if (lowerCategory.includes('naughty') || lowerCategory.includes('nsfw')) {
      categoryJokes = jokes.naughty;
    } else if (lowerCategory.includes('kinky')) {
      categoryJokes = jokes.kinky;
    } else if (lowerCategory.includes('dark')) {
      categoryJokes = jokes.dark;
    } else if (lowerCategory.includes('one-liner') || lowerCategory.includes('one liner') || lowerCategory.includes('oneliner')) {
      categoryJokes = jokes.oneliners;
    } else {
      // Mix everything for general requests
      categoryJokes = allJokes;
    }
  }

  // Select a random joke
  const randomJoke = categoryJokes[Math.floor(Math.random() * categoryJokes.length)];

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800));

  res.status(200).json({ joke: randomJoke });
}
