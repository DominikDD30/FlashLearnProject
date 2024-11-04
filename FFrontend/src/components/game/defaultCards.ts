import { Flashcard } from "../../entities/Flashcard";

const DefaultCards: { id: number, cards: Flashcard[] }[] = [
  {
    id: 1,
    cards: [
      {
        id: 1,
        concept: 'spider',
        definition: 'pająk',
        image: 'https://images.pexels.com/photos/40795/spider-macro-zebra-spider-insect-40795.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 2,
        concept: 'frog',
        definition: 'żaba',
        image: 'https://images.pexels.com/photos/70083/frog-macro-amphibian-green-70083.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 3,
        concept: 'horse',
        definition: 'koń',
        image: 'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 4,
        concept: 'snake',
        definition: 'wąż',
        image: 'https://images.pexels.com/photos/34426/snake-rainbow-boa-reptile-scale.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 5,
        concept: 'cow',
        definition: 'krowa',
        image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 6,
        concept: 'fish',
        definition: 'ryba',
        image: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 7,
        concept: 'cat',
        definition: 'kot',
        image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 8,
        concept: 'bird',
        definition: 'ptak',
        image: 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 9,
        concept: 'whale',
        definition: 'wieloryb',
        image: 'https://images.pexels.com/photos/892548/pexels-photo-892548.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 10,
        concept: 'dragon',
        definition: 'smok',
        image: 'https://images.pexels.com/photos/208326/pexels-photo-208326.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 11,
        concept: 'rhino',
        definition: 'nosorożec',
        image: 'https://images.pexels.com/photos/16040/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 12,
        concept: 'shark',
        definition: 'rekin',
        image: 'https://images.pexels.com/photos/726478/pexels-photo-726478.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
    ],
  },
  {
    id: 2,
    cards: [
      {
        id: 13,
        concept: 'apple',
        definition: 'jabłko',
        image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 14,
        concept: 'banana',
        definition: 'banan',
        image: 'https://images.pexels.com/photos/5876154/pexels-photo-5876154.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 15,
        concept: 'carrot',
        definition: 'marchewka',
        image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 16,
        concept: 'tomato',
        definition: 'pomidor',
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 17,
        concept: 'potato',
        definition: 'ziemniak',
        image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 18,
        concept: 'grape',
        definition: 'winogrono',
        image: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 19,
        concept: 'orange',
        definition: 'pomarańcza',
        image: 'https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 20,
        concept: 'cucumber',
        definition: 'ogórek',
        image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 21,
        concept: 'strawberry',
        definition: 'truskawka',
        image: 'https://images.pexels.com/photos/6944172/pexels-photo-6944172.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 22,
        concept: 'watermelon',
        definition: 'arbuz',
        image: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 23,
        concept: 'pepper',
        definition: 'papryka',
        image: 'https://images.pexels.com/photos/870808/pexels-photo-870808.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      {
        id: 24,
        concept: 'onion',
        definition: 'cebula',
        image: 'https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
    ],
  },
];

// Eksportuj tablicę kart
export default DefaultCards;
