import parser from './parser';

var intRegex = /^\d+$/;

function flowdockHashtag(tokens, idx) {
  var tag = tokens[idx].content;
  var markup = tokens[idx].markup;
  var result = '<a class="tag"';
  if (flowdockHashtag.options && flowdockHashtag.options.pid && (flowdockHashtag.options.href_channel || flowdockHashtag.options.href_task)) {
    if (intRegex.test(tag) && tag !== '0') {
      result += ' data-norender="1" onclick="showTaskByNum(event, ' + tag + ',\'' + flowdockHashtag.options.pid + '\')" href="' + flowdockHashtag.options.href_task + flowdockHashtag.options.pid + '/' + tag + '"';
    }
    else {
      result += ' href="' + flowdockHashtag.options.href_channel + tag + '"';
    }
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
