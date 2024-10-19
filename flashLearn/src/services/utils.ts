// utils.ts
import { Flashcard } from '../entities/Flashcard'
import { CardWithPosition } from '../components/game/GameEntity';
/**
 * Funkcja losowo tasuje elementy w tablicy.
 * @param array Tablica do przetasowania.
 * @returns Przetasowana tablica.
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

/**
 * Tworzy zestaw kart na podstawie podanej liczby par i listy fiszek.
 * @param pairs Liczba par kart.
 * @param flashcardsList Lista dostępnych fiszek.
 * @returns Lista kart z przypisanymi pozycjami.
 */
export const createCardsSet = (
  pairs: number,
  flashcardsList: Flashcard[]
): CardWithPosition[] => {
  // Kopiowanie i tasowanie fiszek
  const shuffledFlashcards = shuffleArray(flashcardsList);

  // Wybór wymaganej liczby par
  const chosenCards = shuffledFlashcards.slice(0, pairs);

  // Generowanie dostępnych pozycji
  const availablePositions: number[] = shuffleArray(
    Array.from({ length: pairs * 2 }, (_, i) => i + 1)
  );

  return setCardsPositions(chosenCards, availablePositions);
};

/**
 * Przypisuje pozycje do wybranych kart i tworzy pary.
 * @param chosenCards Wybrane fiszki.
 * @param availablePositions Dostępne pozycje.
 * @returns Lista kart z przypisanymi pozycjami.
 */
const setCardsPositions = (
  chosenCards: Flashcard[],
  availablePositions: number[]
): CardWithPosition[] => {
  const result: CardWithPosition[] = [];
  let j = 0;

  chosenCards.forEach((chosenCard) => {
    // Tworzenie dwóch instancji karty dla pary
    const card1: CardWithPosition = {
      concept: chosenCard.concept,
      definition: chosenCard.definition,
      image: chosenCard.image||'',
      position: availablePositions[j],
      visible: false,
    };

    const card2: CardWithPosition = {
      concept: chosenCard.concept,
      definition: chosenCard.definition,
      image: chosenCard.image||'',
      position: availablePositions[j + 1],
      visible: false,
    };

    result.push(card1, card2);
    j += 2;
  });

  // Przetasowanie wynikowej listy kart
  return shuffleArray(result);
};
