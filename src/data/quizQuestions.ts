export interface QuizQuestion {
  id: number;
  level: string; // e.g. "IGCSE Level 9 / Cambridge 0500"
  points: number;
  topic: string; // e.g. "Connotative Resonance", "Semantic Fields", "Diction & Register"
  hostIntro: string; // Steve Harvey style host banter
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
    isCorrect: boolean;
    audiencePercent: number; // for "Ask the Audience" lifeline
  }[];
  explanation: string;
  examinerInsight: string; // Cambridge IGCSE examiner commentary
}

export const IGCSE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    level: 'IGCSE First Language English (0500) · Question 2(d)',
    points: 100,
    topic: 'Denotation vs. Connotative Degradation',
    hostIntro:
      "Alright contestants, look sharp! We're kicking off Round 1 with pure lexical firepower. Don't let the dictionary fool you!",
    question:
      'In an IGCSE Paper 1 analysis of a dystopian wasteland, the author writes: "The survivors clustered around the carcass of the abandoned generator." Which analysis best unlocks the connotative gravity of "carcass"?',
    options: [
      {
        key: 'A',
        text: 'It is a technical noun denoting a mechanical chassis that has suffered structural metal failure.',
        isCorrect: false,
        audiencePercent: 6,
      },
      {
        key: 'B',
        text: 'It zoomorphizes the machine into decaying animal flesh, suggesting the scavenging desperation of the survivors and a world where technology itself has died.',
        isCorrect: true,
        audiencePercent: 78,
      },
      {
        key: 'C',
        text: 'It creates vivid visual imagery because carcasses are unpleasant to look at in abandoned towns.',
        isCorrect: false,
        audiencePercent: 12,
      },
      {
        key: 'D',
        text: 'It suggests the generator is literally rotting biologically due to high atmospheric humidity.',
        isCorrect: false,
        audiencePercent: 4,
      },
    ],
    explanation:
      '"Carcass" carries visceral organic connotations of butchery, decay, and carrion. Applying it to an inorganic machine (zoomorphism/metaphor) implies the machine was once the living lifeblood of the civilization, and the survivors are now reduced to desperate scavengers picking at dead bones.',
    examinerInsight:
      'Examiner Tip: Option C commits the fatal error warned in Slide 13 ("this creates imagery"). Top Grade 9 responses isolate the organic/carrion semantic field and articulate the psychological degradation of the survivors.',
  },
  {
    id: 2,
    level: 'IGCSE Literature in English (0475) · Poetry Analysis',
    points: 200,
    topic: 'Sensory Friction & Oxymoronic Diction',
    hostIntro:
      "Round 2! Big George Orwell energy right here. If you blink, you're gonna pick the distractor!",
    question:
      'Consider the phrase: "A bright cold day in April, and the clocks were striking thirteen." Why did the author select "bright cold" instead of "sunny and chilly"?',
    options: [
      {
        key: 'A',
        text: 'Because "sunny" has two syllables whereas "bright" creates monosyllabic Anglo-Saxon meter.',
        isCorrect: false,
        audiencePercent: 9,
      },
      {
        key: 'B',
        text: 'To create sensory dissonance: the sunlight offers the visual promise of spring warmth, but remains sterile, clinical, and inhospitable—mirroring the deceptive surveillance state.',
        isCorrect: true,
        audiencePercent: 72,
      },
      {
        key: 'C',
        text: 'To demonstrate that April weather in Great Britain is notoriously unpredictable and variable.',
        isCorrect: false,
        audiencePercent: 14,
      },
      {
        key: 'D',
        text: 'To personify the sunlight as an enemy combating the temperature of the London atmosphere.',
        isCorrect: false,
        audiencePercent: 5,
      },
    ],
    explanation:
      '"Bright cold" forms an oxymoronic sensory tension. Sunlight usually brings biological warmth and comfort; pairing it with "cold" strips away comfort, warning the reader that even natural light in Oceania has become severe, sterile, and unfeeling.',
    examinerInsight:
      'Examiner Tip: Always explore sensory conflict. "Bright" juxtaposed with "cold" primes the reader for the impossible totalitarian distortion ("thirteen") that follows.',
  },
  {
    id: 3,
    level: 'IGCSE English (0500) · Lexical Precision & Transitive Verbs',
    points: 300,
    topic: 'Kinetic Economy & Verb Replacement',
    hostIntro:
      "Contestants, put your hands on the buzzer! We are burning the adverb pile-up once and for all!",
    question:
      'A student writes: "The interrogator looked very closely and suspiciously into Winston\'s eyes, speaking in a very threatening and quiet whisper." How should an IGCSE candidate compress this using high-register kinetic verbs?',
    options: [
      {
        key: 'A',
        text: '"The interrogator stared intently into Winston\'s eyes, murmuring with ominous hostility."',
        isCorrect: false,
        audiencePercent: 21,
      },
      {
        key: 'B',
        text: '"The interrogator scrutinized Winston, hissing threats."',
        isCorrect: true,
        audiencePercent: 64,
      },
      {
        key: 'C',
        text: '"The interrogator watched Winston carefully while vocalizing in a sinister, whispering cadence."',
        isCorrect: false,
        audiencePercent: 10,
      },
      {
        key: 'D',
        text: '"The interrogator eyeballed Winston in a threateningly silent way."',
        isCorrect: false,
        audiencePercent: 5,
      },
    ],
    explanation:
      '"Scrutinized" encapsulates looking closely, critically, and forensically with suspicion in a single compact verb. "Hissing" encapsulates the sibilant, threatening, quiet whisper without propping up weak verbs with adverbs like "very" or "closely".',
    examinerInsight:
      'Examiner Tip: Cutting adverbial deadweight elevates your writing to Band 5 (Full Marks for Style). One precise Latinate or Germanic verb carries 300% more narrative acceleration.',
  },
  {
    id: 4,
    level: 'IGCSE Paper 2 · Directed Writing & Register',
    points: 400,
    topic: 'Tonal Nuance & Pejorative Suffixes',
    hostIntro:
      "Steve Harvey voice: 'Look at the board! You think all synonyms are friends? Some of these words will get you slapped!'",
    question:
      'Which word in the following cluster conveys the most offensive degree of unyielding obstinacy due to its zoomorphic connotations?',
    options: [
      {
        key: 'A',
        text: 'Determined (Old French: détermingier)',
        isCorrect: false,
        audiencePercent: 4,
      },
      {
        key: 'B',
        text: 'Resolute (Latin: resolūtus)',
        isCorrect: false,
        audiencePercent: 7,
      },
      {
        key: 'C',
        text: 'Stubborn (Middle English: stibourne)',
        isCorrect: false,
        audiencePercent: 18,
      },
      {
        key: 'D',
        text: 'Pig-headed (Compound Germanic pejorative)',
        isCorrect: true,
        audiencePercent: 71,
      },
    ],
    explanation:
      '"Pig-headed" projects deliberate, animalistic stupidity and base intractability. While "determined" and "resolute" are laudatory virtues and "stubborn" is a moderate behavioral fault, "pig-headed" insults the subject\'s intellect and civility.',
    examinerInsight:
      'Examiner Tip: Notice the progression of tone: Determined (admirable) → Stubborn (vexing) → Pig-headed (contemptible). Tone gradients are essential for Level 8/9 Cambridge analysis.',
  },
  {
    id: 5,
    level: 'IGCSE First Language English · Cumulative Semantic Field',
    points: 500,
    topic: 'Atmospheric Architecture',
    hostIntro:
      "HALFWAY MARK! 500 points on the board! Let's see if you can track the invisible scent of a semantic field!",
    question:
      'An author crafts a description of a boardroom using the words: "predator", "scented blood", "encircled", "talons", and "quarry". What semantic field is established, and what is its psychological effect on the reader?',
    options: [
      {
        key: 'A',
        text: 'A semantic field of agriculture, reassuring the reader of sustainable corporate growth.',
        isCorrect: false,
        audiencePercent: 3,
      },
      {
        key: 'B',
        text: 'A semantic field of predatory wildlife/carnivorous hunting, transforming civilized corporate negotiations into ruthless Darwinian savagery.',
        isCorrect: true,
        audiencePercent: 84,
      },
      {
        key: 'C',
        text: 'A semantic field of medical surgery, highlighting the clinical precision of executive decisions.',
        isCorrect: false,
        audiencePercent: 8,
      },
      {
        key: 'D',
        text: 'A semantic field of maritime piracy, illustrating overseas asset acquisition.',
        isCorrect: false,
        audiencePercent: 5,
      },
    ],
    explanation:
      'Words like "predator", "scented blood", "encircled", "talons", and "quarry" belong to the semantic field of apex predatory hunting. By transposing animalistic bloodlust into an executive boardroom, the writer strips the corporate suits of their civilized façade, revealing merciless corporate cannibalism.',
    examinerInsight:
      'Examiner Tip: In IGCSE Q2, identifying the semantic field by name ("predatory/hunting field") earns immediate Level 5 marks when paired with its psychological consequence.',
  },
  {
    id: 6,
    level: 'IGCSE Literature in English · War Poetry (Wilfred Owen)',
    points: 600,
    topic: 'Simile Diction & Social Inversion',
    hostIntro:
      "Round 6! Straight from our Slide 11 Exam Sprint! Owen's trench warfare poetry—let's see who really understands the suffering!",
    question:
      'In "Bent double, like old beggars under sacks, / Knock-kneed, coughing like hags, we cursed through sludge", how does Owen\'s diction subvert contemporary patriotic propaganda?',
    options: [
      {
        key: 'A',
        text: 'By comparing youthful, virile soldiers to impoverished outcasts ("beggars") and decrepit elderly women ("hags"), systematically dismantling the romantic myth of glorious, noble military service.',
        isCorrect: true,
        audiencePercent: 88,
      },
      {
        key: 'B',
        text: 'By demonstrating that the British army lacked adequate winter coats and uniforms in 1917.',
        isCorrect: false,
        audiencePercent: 5,
      },
      {
        key: 'C',
        text: 'By rhyming "sacks" with "hags" to establish an upbeat, musical rhythm for recruits.',
        isCorrect: false,
        audiencePercent: 3,
      },
      {
        key: 'D',
        text: 'By describing the soldiers as literally asking passersby for spare coins and food in the mud.',
        isCorrect: false,
        audiencePercent: 4,
      },
    ],
    explanation:
      'Owen purposefully strips the soldiers of their heroic manhood. Propaganda depicted soldiers as upright, handsome, youthful athletes; Owen\'s diction ("beggars", "hags", "bent double") degrades them into withered, marginalized figures of social destitution and grotesque physical infirmity.',
    examinerInsight:
      'Examiner Tip: Notice how the answer links diction ("beggars", "hags") to connotation (destitution, emasculation) and historical context (anti-propaganda). This is the hallmark of top-tier exam technique.',
  },
  {
    id: 7,
    level: 'IGCSE English (0500) · Grammatical Nuance & Subject-Verb Agreement',
    points: 700,
    topic: 'Syntactic Mastery & Stylistic Inversion',
    hostIntro:
      "Steve Harvey leans over the podium: 'Listen to me carefully now! A lot of folks lose an entire grade boundary on this exact trick!'",
    question:
      'Which of the following complex sentences exhibits impeccable IGCSE grammatical precision and sophisticated rhetorical control?',
    options: [
      {
        key: 'A',
        text: 'Neither the desolate landscape nor the crumbling towers were capable of sheltering the wanderer from the gale.',
        isCorrect: true,
        audiencePercent: 69,
      },
      {
        key: 'B',
        text: 'Neither the desolate landscape nor the crumbling towers was capable of sheltering the wanderer from the gale.',
        isCorrect: false,
        audiencePercent: 19,
      },
      {
        key: 'C',
        text: 'Neither the desolate landscape or the crumbling towers were capable of sheltering the wanderer from the gale.',
        isCorrect: false,
        audiencePercent: 8,
      },
      {
        key: 'D',
        text: 'Neither the desolate landscape nor the crumbling towers were not capable of sheltering the wanderer from the gale.',
        isCorrect: false,
        audiencePercent: 4,
      },
    ],
    explanation:
      'Correlative conjunction rule: "neither... nor" (not "or"). When subjects differ in number ("the desolate landscape" [singular] and "the crumbling towers" [plural]), the verb agrees with the closer subject ("towers were"). Furthermore, option D introduces an ungrammatical double negative.',
    examinerInsight:
      'Examiner Tip: Proximity agreement with compound correlative conjunctions is a classic differentiator between Grade 7 and Grade 9 English grammar.',
  },
  {
    id: 8,
    level: 'IGCSE Paper 1 (0500) · Register & Euphemistic Distance',
    points: 800,
    topic: 'Tonal Manipulation & Bureaucratic Sanitization',
    hostIntro:
      "Round 8! 800 big points! We saw this on Slide 6 with 'passed away' vs 'kicked the bucket' vs 'WAS KILLED'. Time to test executive euphemisms!",
    question:
      'When an authoritarian regime refers to civilian casualties as "collateral damage", what is the precise rhetorical strategy being deployed?',
    options: [
      {
        key: 'A',
        text: 'Hyperbolic exaggeration to frighten neighboring states into rapid surrender.',
        isCorrect: false,
        audiencePercent: 6,
      },
      {
        key: 'B',
        text: 'Sensory onomatopoeia mimicking the physical detonation of mortar shells.',
        isCorrect: false,
        audiencePercent: 4,
      },
      {
        key: 'C',
        text: 'Bureaucratic euphemism using sterile financial/commercial diction ("collateral") to distance the public from moral culpability and human bloodshed.',
        isCorrect: true,
        audiencePercent: 81,
      },
      {
        key: 'D',
        text: 'Metonymy where the damage represents the building foundations rather than people.',
        isCorrect: false,
        audiencePercent: 9,
      },
    ],
    explanation:
      '"Collateral" is loan and banking vocabulary; "damage" is property terminology. Combining them dehumanizes dead human beings into incidental financial overhead, neutralizing the moral horror of murder.',
    examinerInsight:
      'Examiner Tip: High-scoring responses explore how register (e.g. bureaucratic, clinical, euphemistic) is weaponized by speakers to manufacture ethical detachment.',
  },
  {
    id: 9,
    level: 'IGCSE First Language English · Evaluating Authorial Craft',
    points: 900,
    topic: 'Wave Dynamics & Kinetic Verbs (Slide 10)',
    hostIntro:
      "Tension is electric! Round 9! We are dealing with the ferocious Atlantic surf from Slide 10!",
    question:
      'Compare: (1) "The waves touched against the rocks." vs (2) "The waves smashed against the rocks." In an IGCSE response analyzing coastal dread, why does "smashed" achieve superior authorial craft?',
    options: [
      {
        key: 'A',
        text: 'Because "smashed" is seven letters long while "touched" is only six letters long.',
        isCorrect: false,
        audiencePercent: 2,
      },
      {
        key: 'B',
        text: 'Because "touched" suggests romantic intimacy, whereas "smashed" carries violent, concussive acoustic energy and catastrophic kinetic force, presaging inevitable shipwreck.',
        isCorrect: true,
        audiencePercent: 86,
      },
      {
        key: 'C',
        text: 'Because "smashed" is an intransitive verb that cannot accept a direct object.',
        isCorrect: false,
        audiencePercent: 7,
      },
      {
        key: 'D',
        text: 'Because examiners strictly award more marks for verbs starting with the letter S.',
        isCorrect: false,
        audiencePercent: 5,
      },
    ],
    explanation:
      '"Touched" personifies the sea as tender and gentle. "Smashed" infuses the tide with violent malice, explosive decibels, and shattering concussive impact. In an exam answer on coastal dread, it directly proves mortal peril and environmental hostility.',
    examinerInsight:
      'Examiner Tip: Connect the verb directly to its acoustic value (onomatopoeic plosive /sm/) and kinetic payload. This guarantees maximum marks for lexical appreciation.',
  },
  {
    id: 10,
    level: 'IGCSE Level 9 Grand Finale · The Cardinal Rule (Slide 13)',
    points: 1000,
    topic: 'Mastery of Analytical Formula',
    hostIntro:
      "THIS IS IT! THE GRAND CHAMPIONSHIP QUESTION! 1000 POINTS ON THE BOARD! Don't blow it on the final buzzer!",
    question:
      'Which analytical statement would be awarded FULL MARKS (Level 5 / Band 1) by a Senior Cambridge IGCSE Examiner for language analysis?',
    options: [
      {
        key: 'A',
        text: '"The writer uses lots of powerful adjectives and metaphors which really creates great imagery, making the reader imagine the spooky scene clearly in their mind."',
        isCorrect: false,
        audiencePercent: 11,
      },
      {
        key: 'B',
        text: '"The verb \'shuffled\' connotes extreme biological exhaustion and physical frailty; by evoking the audible, labored dragging of worn soles, it emphasizes the protagonist\'s total loss of vigor and vulnerability."',
        isCorrect: true,
        audiencePercent: 82,
      },
      {
        key: 'C',
        text: '"The word \'shuffled\' is an example of alliteration that makes the text flow nicely and catches the reader\'s eye so they want to read on."',
        isCorrect: false,
        audiencePercent: 5,
      },
      {
        key: 'D',
        text: '"The writer says the man shuffled, which literally means he walked into the room slowly with his feet."',
        isCorrect: false,
        audiencePercent: 2,
      },
    ],
    explanation:
      'Option B strictly fulfills the Cambridge Level 9 Rubric: (1) Exact quotation identified with correct word class ("verb \'shuffled\'"), (2) Precise emotional/physical connotation explained ("biological exhaustion and frailty"), (3) Sensory/auditory impact unpacked ("audible, labored dragging"), and (4) Thematic consequence proven ("loss of vigor and vulnerability"). Option A commits the banned "creates imagery" cliché, Option C is false feature-spotting, and Option D is mere literal paraphrasing.',
    examinerInsight:
      'Examiner Tip: Slide 13 Golden Formula in action: "The word \'<quote>\' connotes <connotation>, which creates a sense of <effect> for the reader." Master this and Grade 9 is yours!',
  },
];
