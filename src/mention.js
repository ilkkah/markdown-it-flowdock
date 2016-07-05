import parser from './parser';

function flowdockMention(tokens, idx) {
  var tag = tokens[idx].content;
  var markup = tokens[idx].markup;
  var result = '<a class="mention"';
  if (flowdockMention.options && flowdockMention.options.href) {
	result += ' href="' + flowdockMention.options.href + tag + '"';
  }
  result += '>' + markup + tag + '</a>';

  return result;
}

export default function(md, options) {
  const split = "@|＠";
  const mention = parser(md, 'mention', new RegExp(split));
  md.core.ruler.push('mention', mention);
  flowdockMention.options = options && options.mentions;
  md.renderer.rules.mention = flowdockMention;
};
