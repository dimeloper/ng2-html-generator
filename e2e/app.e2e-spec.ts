import { Ng2HtmlGeneratorPage } from './app.po';

describe('ng2-html-generator App', () => {
  let page: Ng2HtmlGeneratorPage;

  beforeEach(() => {
    page = new Ng2HtmlGeneratorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
