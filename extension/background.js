(function() {
	'use strict';

	try {
    chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
      try {
        var mappingKey = 'nl.sjmulder.urlrewrite.mappings';
        var additionsKey = 'nl.sjmulder.urlrewrite.additions';

        var mappings = JSON.parse(localStorage[mappingKey] || '[]');
        var additions = JSON.parse(localStorage[additionsKey] || '[]');
        var newUrl = details.url
        for (var i = 0; i < mappings.length; i++) {
          const mapping = mappings[i];
          if (details.url.indexOf(mapping.sourceUrl) === 0) {
            newUrl = mapping.destinationUrl + details.url.slice(mapping.sourceUrl.length);
            console.log('rewriting', details.url, 'to', newUrl);
            chrome.tabs.update(details.tabId, {url: newUrl})
            break
          }
        }
        for (var i = 0; i < additions.length; i++) {
          const addition = additions[i]
          if (newUrl.indexOf(addition.sourceUrl) === 0) {
            const parsedUrl = new URL(newUrl)
            if (parsedUrl.search && parsedUrl.search.indexOf(addition.addition) !== -1) {
              continue
            }
            if (parsedUrl.search) {
              parsedUrl.search += '&' + addition.addition
            } else {
              parsedUrl.search = '?' + addition.addition
            }
            newUrl = parsedUrl.toString()
            chrome.tabs.update(details.tabId, {url: newUrl})
            break
          }
        }
      } catch (e) {
        console.error('Error on processing url', e)
      }

    });
  } catch (e) {
	  console.error('Error on adding lister', e)
  }

})();
