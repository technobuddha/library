const find                              = /[\u00A0–—‘’‹›“”«»©®¼½¾…€™←→⇐⇒⇔☹☺]/g;
const replace: Record<string, string>   = {
    "\u00A0": " ",
    "–":      "-",
    "—":      "-",
    "‘":      "'",
    "’":      "'",
    "‹":      "<",
    "›":      ">",
    "“":      "\"",
    "”":      "\"",
    "«":      "<<",
    "»":      ">>",
    "©":      "(c)",
    "®":      "(r)",
    "¼":      "1/4",
    "½":      "1/2",
    "¾":      "3/4",
    "…":      "...",
    "€":      "(e)",
    "™":      "(tm)",
    "←":      "<--",
    "→":      "-->",
    "⇐":     "<==",
    "⇒":     "==>",
    "⇔":     "<=>",
    "☹":     ":(",
    "☺":     ":)"
};

/**
  * Microsoft word changes some special characters to make it look better, this will change them back to simple form
  * @param    input        The mangled string
  * @returns            {@code input} with special characters replaces
  */
export function correctMSWord(input: string): string {
    return input.replace(find, a => replace[a] ?? a);
}

export default correctMSWord;
