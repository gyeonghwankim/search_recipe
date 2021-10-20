import View from "./View.js";

const tag = '[ResultView]';

const ResultView = Object.create(View);

ResultView.setup = function(element){
    this.init(element);
    console.log(tag, 'setup');
}

ResultView.render = function(data = []){
    console.log(tag, 'render()', data);
    this.el.innerHTML = data.length ? this.getSearchResultHtml(data) : `검색 결과가 없습니다.`;
}

ResultView.getSearchResultHtml = function(data){
    return data.reduce((html, item) => {
        html += this.getSearchItemHtml(item);
        return html;
    }, '<ul>') + '</ul>'
}

ResultView.getSearchItemHtml = function(item){
    return `<li>
        <img src="${item.image}"/>
        ${item.name}
    </li>`;
}

export default ResultView;