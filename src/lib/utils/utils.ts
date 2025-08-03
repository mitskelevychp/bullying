import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Функція для транслітерації та створення slug
export function slugify(text: string): string {
  const transliterationMap: { [key: string]: string } = {
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ie",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "",
    ю: "yu",
    я: "ya",
    А: "A",
    Б: "B",
    В: "V",
    Г: "H",
    Ґ: "G",
    Д: "D",
    Е: "E",
    Є: "Ye",
    Ж: "Zh",
    З: "Z",
    И: "Y",
    І: "I",
    Ї: "Yi",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Shch",
    Ь: "",
    Ю: "Yu",
    Я: "Ya",
    // Заміна пробілів та інших символів
    " ": "-",
    _: "-",
    ".": "",
    ",": "",
    "/": "-",
    "\\": "-",
    "(": "",
    ")": "",
    "[": "",
    "]": "",
    "{": "",
    "}": "",
    "!": "",
    "@": "",
    "#": "",
    $: "",
    "%": "",
    "^": "",
    "&": "",
    "*": "",
    "+": "",
    "=": "",
    "|": "",
    "'": "",
    '"': "",
    ";": "",
    ":": "",
    "<": "",
    ">": "",
    "?": "",
    "~": "",
    "`": "",
  };

  let slug = "";
  for (const char of text) {
    slug += transliterationMap[char] || char;
  }

  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "") // Видаляємо будь-які символи, що залишилися, крім літер, цифр та дефісів
    .replace(/^-+|-+$/g, "") // Видаляємо початкові/кінцеві дефіси
    .replace(/-+/g, "-"); // Замінюємо кілька дефісів одним
}
