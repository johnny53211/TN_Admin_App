// =================================================
/*
   Author       : Johnson R 
   Created Date :
   Edited Date  :
   Description  : Render Template Functionalities
*/
// ==================================================
'use strict';
let template = {
    templateHTML: '',
    // access templating files 
    accessFile: async (path) => {
        await $.get(path).done((res) => {
            const extension = path.split('.').pop();
            switch (extension) {
                case 'html':
                    template.templateHTML = res;
                    break;
            }
        });
    },// rendering template files in html page
    renderTemplate: (templateId, pageSelectorId, renderJson, pageElement, action = 1) => {
        let templateScript = $(template.templateHTML).filter(templateId).html();
        let compiledTemplate = Template7.compile(templateScript);
        let html = compiledTemplate(renderJson);
        if (pageSelectorId) {
            switch (action) {
                case 1:
                    $(pageSelectorId).html(html);
                    break;
                case 2: // action 2 is render page content
                    pageElement.find(pageSelectorId).html(html);
                    break;
            }
        } else {
            return html;
        }
    },// init page  page dat_name get
    getDataName: () => {
        return event.target.dataset.name;
    }
}