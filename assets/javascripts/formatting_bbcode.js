(function() {
  if (Discourse.dialect_deprecated) { return; }

  Discourse.BBCode.replaceBBCode("floatl", function(contents) { return ['div', {'class': 'floatl'}].concat(contents); });
  Discourse.Markdown.whiteListTag('div', 'class', 'floatl');

  Discourse.BBCode.replaceBBCode("floatr", function(contents) { return ['div', {'class': 'floatr'}].concat(contents); });
  Discourse.Markdown.whiteListTag('div', 'class', 'floatr');

  // [LEFT]...[/LEFT]
  // [CENTER]...[/CENTER]
  // [RIGHT]...[/RIGHT]
  // [JUSTIFY]...[/JUSTIFY]
  ["left", "center", "right", "justify"].forEach(function(direction){
    Discourse.BBCode.replaceBBCode(direction, function(contents) { return ['div', {'style': "text-align:" + direction}].concat(contents); });
  });
  Discourse.Markdown.whiteListTag('div', 'style', /^text-align:.+$/);

  //------------------------------- FONT -----------------------------------------

  // NOTE: the regex is based on http://blog.stevenlevithan.com/archives/reverse-recursive-pattern
  //       it's removing the most nested first and iterating using the while loop to remove less nested matches.

  function replaceFontColor (text) {
    while (text != (text = text.replace(/\[color=([^\]]+)\]((?:(?!\[color=[^\]]+\]|\[\/color\])[\S\s])*)\[\/color\]/ig, function (match, p1, p2, offset, string) {
      return "<font color='" + p1 + "'>" + p2 + "</font>";
    })));
    return text;
  }

  function replaceFontSize (text) {
    while (text != (text = text.replace(/\[size=([^\]]+)\]((?:(?!\[size=[^\]]+\]|\[\/size\])[\S\s])*)\[\/size\]/ig, function (match, p1, p2, offset, string) {
      return "<font size='" + p1 + "'>" + p2 + "</font>";
    })));
    return text;
  }

  Discourse.Dialect.addPreProcessor(replaceFontColor);
  Discourse.Dialect.addPreProcessor(replaceFontSize);

  Discourse.Markdown.whiteListTag('font', 'color');
  Discourse.Markdown.whiteListTag('font', 'size');
  
  //------------------------------- FA -----------------------------------------
  
  // NOTE: example of fa call expression 
  // <i class="fa fa-adjust" aria-hidden="true"></i>
  
  function replaceFa (text) {
    while (text != (text = text.replace(/\[fa=([^\]]+)\]((?:(?!\[fa=[^\]]+\]|\[\/fa\])[\S\s])*)\[\/fa\]/ig, function (match, p1, p2, offset, string) {
      return "<i class='fa " + p1 + "' aria-hidden='true'></i>";
    })));
    return text;
  }
  
  Discourse.Dialect.addPreProcessor(replaceFa);
  Discourse.Markdown.whiteListTag('fa', 'class');

})();
