import parser from './parser';

function flowdockHashtag(tokens, idx) {
  var tag = tokens[idx].content;
  var markup = tokens[idx].markup;
  var result = '<a class="tag"';
  if (flowdockHashtag.options && flowdockHashtag.options.href) {
	result += ' href="' + flowdockHashtag.options.href + tag + '"';
  }
  result += '>' + markup + tag + '</a>';

  return result;
}

export default function(md, options) {
  const split = "#|＃";
  const hashtag = parser(md, 'hashtag', new RegExp(split));
  md.core.ruler.push('hashtag', hashtag);
  flowdockHashtag.options = options && options.hashtags;
  md.renderer.rules.hashtag = flowdockHashtag;
};
