import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

const quotes = [
  { quote: "May the Force be with you.", movie: "Star Wars" },
  { quote: "I'm gonna make him an offer he can't refuse.", movie: "The Godfather" },
  { quote: "Here's looking at you, kid.", movie: "Casablanca" },
  { quote: "I'll be back.", movie: "The Terminator" },
  { quote: "Why so serious?", movie: "The Dark Knight" },
  { quote: "Houston, we have a problem.", movie: "Apollo 13" },
  { quote: "To infinity and beyond!", movie: "Toy Story" },
  { quote: "You talking to me?", movie: "Taxi Driver" },
  { quote: "Say hello to my little friend!", movie: "Scarface" },
  { quote: "Life is like a box of chocolates.", movie: "Forrest Gump" },
  { quote: "I'm the king of the world!", movie: "Titanic" },
  { quote: "They may take our lives, but they'll never take our freedom!", movie: "Braveheart" },
  { quote: "Keep your friends close, but your enemies closer.", movie: "The Godfather Part II" },
  { quote: "Just keep swimming.", movie: "Finding Nemo" },
  { quote: "You shall not pass!", movie: "The Lord of the Rings: The Fellowship of the Ring" },
  { quote: "I am your father.", movie: "Star Wars: Episode V – The Empire Strikes Back" },
  { quote: "I'm walking here! I'm walking here!", movie: "Midnight Cowboy" },
  { quote: "Nobody puts Baby in a corner.", movie: "Dirty Dancing" },
  { quote: "Hasta la vista, baby.", movie: "Terminator 2: Judgment Day" },
  { quote: "This is Sparta!", movie: "300" },
  { quote: "I drink your milkshake!", movie: "There Will Be Blood" },
  { quote: "Carpe diem. Seize the day, boys.", movie: "Dead Poets Society" },
  { quote: "My precious.", movie: "The Lord of the Rings: The Two Towers" },
  { quote: "ET phone home.", movie: "E.T. the Extra-Terrestrial" },
  { quote: "The first rule of Fight Club is: You do not talk about Fight Club.", movie: "Fight Club" },
  { quote: "You either die a hero, or you live long enough to see yourself become the villain.", movie: "The Dark Knight" },
  { quote: "I wish I knew how to quit you.", movie: "Brokeback Mountain" },
  { quote: "I'm having an old friend for dinner.", movie: "The Silence of the Lambs" },
  { quote: "That rug really tied the room together.", movie: "The Big Lebowski" },
  { quote: "Gentlemen, you can't fight in here! This is the War Room!", movie: "Dr. Strangelove" },
  { quote: "I am serious. And don't call me Shirley.", movie: "Airplane!" },
  { quote: "Roads? Where we're going, we don't need roads.", movie: "Back to the Future" },
  { quote: "Get away from her, you bitch!", movie: "Aliens" },
  { quote: "I'm as mad as hell, and I'm not going to take this anymore!", movie: "Network" }
]

app.get('/', (c) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  return c.json(randomQuote)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
