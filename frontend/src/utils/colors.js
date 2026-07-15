const colorPairs = [
  { bg: "bg-blue-100", text: "text-blue-800" },
  { bg: "bg-blue-200", text: "text-blue-900" },
  { bg: "bg-indigo-100", text: "text-indigo-800" },
  { bg: "bg-indigo-200", text: "text-indigo-900" },
  { bg: "bg-purple-100", text: "text-purple-800" },
  { bg: "bg-purple-200", text: "text-purple-900" },
  { bg: "bg-pink-100", text: "text-pink-800" },
  { bg: "bg-pink-200", text: "text-pink-900" },
  { bg: "bg-red-100", text: "text-red-800" },
  { bg: "bg-red-200", text: "text-red-900" },
  { bg: "bg-orange-100", text: "text-orange-800" },
  { bg: "bg-orange-200", text: "text-orange-900" },
  { bg: "bg-yellow-100", text: "text-yellow-800" },
  { bg: "bg-yellow-200", text: "text-yellow-900" },
  { bg: "bg-green-100", text: "text-green-800" },
  { bg: "bg-green-200", text: "text-green-900" },
  { bg: "bg-teal-100", text: "text-teal-800" },
  { bg: "bg-teal-200", text: "text-teal-900" },
  { bg: "bg-cyan-100", text: "text-cyan-800" },
  { bg: "bg-cyan-200", text: "text-cyan-900" },
  { bg: "bg-sky-100", text: "text-sky-800" },
  { bg: "bg-sky-200", text: "text-sky-900" },
  { bg: "bg-gray-100", text: "text-gray-800" },
  { bg: "bg-gray-200", text: "text-gray-900" },
  { bg: "bg-slate-100", text: "text-slate-800" },
  { bg: "bg-slate-200", text: "text-slate-900" },
  { bg: "bg-zinc-100", text: "text-zinc-800" },
  { bg: "bg-zinc-200", text: "text-zinc-900" },
  { bg: "bg-stone-100", text: "text-stone-800" },
  { bg: "bg-stone-200", text: "text-stone-900" },
];


export const getRandomColorPair = () => colorPairs[Math.floor(Math.random() * colorPairs.length)]

export const getBlueColor = () => colorPairs[0]