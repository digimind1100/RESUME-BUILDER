export const MIN_REVIEW_LENGTH = 50;
export const MIN_REVIEW_WORDS = 6;

const RELATED_REVIEW_TERMS = [
  "resume",
  "cv",
  "template",
  "builder",
  "download",
  "pdf",
  "cover",
  "letter",
  "job",
  "career",
  "application",
  "professional",
  "format",
  "design",
  "easy",
  "help",
  "helpful",
  "useful",
  "experience",
  "service",
  "website",
  "site",
  "tool",
  "ai",
  "create",
  "created",
  "make",
  "making",
  "write",
  "writing",
  "edit",
  "editing",
];

const getWords = (text) => text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];

const hasVowel = (word) => /[aeiou]/.test(word);

const isSpamWord = (word) =>
  word.length >= 4 &&
  (!hasVowel(word) || /(.)\1{3,}/.test(word) || /[bcdfghjklmnpqrstvwxyz]{5,}/.test(word));

const hasRelatedTerm = (words) =>
  words.some((word) =>
    RELATED_REVIEW_TERMS.some((term) => word === term || word.startsWith(term))
  );

export const validateReviewText = (text) => {
  const trimmedText = text.trim();
  const words = getWords(trimmedText);
  const meaningfulWords = words.filter((word) => word.length >= 3);
  const uniqueMeaningfulWords = new Set(meaningfulWords);
  const spamWordCount = meaningfulWords.filter(isSpamWord).length;

  if (trimmedText.length < MIN_REVIEW_LENGTH) {
    return {
      isValid: false,
      message: `Please write at least ${MIN_REVIEW_LENGTH} characters about your experience.`,
      reason: "length",
    };
  }

  if (words.length < MIN_REVIEW_WORDS || uniqueMeaningfulWords.size < 4) {
    return {
      isValid: false,
      message: "Please write a related review.",
      reason: "word_count",
    };
  }

  if (!hasRelatedTerm(words)) {
    return {
      isValid: false,
      message: "Please write a related review.",
      reason: "related",
    };
  }

  if (/(.)\1{4,}/.test(trimmedText) || /(..)\1{3,}/i.test(trimmedText)) {
    return {
      isValid: false,
      message: "Please write a related review.",
      reason: "repeated_text",
    };
  }

  if (meaningfulWords.length > 0 && spamWordCount / meaningfulWords.length > 0.35) {
    return {
      isValid: false,
      message: "Please write a related review.",
      reason: "nonsense",
    };
  }

  return {
    isValid: true,
    message: "Thank you. This looks helpful.",
    reason: "valid",
  };
};
