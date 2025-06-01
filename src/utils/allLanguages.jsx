const languageMap = [
  { code: "en", label: "English", country: "gb" },
  { code: "es", label: "Spanish", country: "es" },
  { code: "fr", label: "French", country: "fr" },
  { code: "de", label: "German", country: "de" },
  { code: "it", label: "Italian", country: "it" },
  { code: "pt", label: "Portuguese", country: "pt" },
  { code: "ru", label: "Russian", country: "ru" },
  { code: "zh", label: "Chinese", country: "cn" },
  { code: "ja", label: "Japanese", country: "jp" },
  { code: "ko", label: "Korean", country: "kr" },
  { code: "ar", label: "Arabic", country: "sa" },
  { code: "hi", label: "Hindi", country: "in" },
  { code: "pl", label: "Polish", country: "pl" },
  { code: "nl", label: "Dutch", country: "nl" },
  { code: "el", label: "Greek", country: "gr" },
  { code: "he", label: "Hebrew", country: "il" },
  { code: "fi", label: "Finnish", country: "fi" },
  { code: "hu", label: "Hungarian", country: "hu" },
  { code: "id", label: "Indonesian", country: "id" },
  { code: "no", label: "Norwegian", country: "no" },
];

const allLanguages = languageMap.map(({ code, label }) => ({
  value: code,
  label: `${label} ${code}`,
}));

export default allLanguages;
