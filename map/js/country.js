import { createCountryByCode,startPreviewCountries,createCountry,mySort,fillSelectBox,getNameByCode, classCard, startClass} from "./countryManager.js";



export default class Country {
    constructor(_parent, _item, _startPreviewCountries, _getNameByCode, _createCountryByCode) {
      // functions
      this.startPreviewCountries = _startPreviewCountries;
      this.getNameByCode = _getNameByCode;
      this.createCountryByCode = _createCountryByCode;
  
      this.parent = _parent;
      this.name = _item.name.common;
      this.pop = _item.population;
      this.capital = _item.capital ? _item.capital : "none";
      this.languages = _item.languages ? Object.values(_item.languages).join() : "none";      this.flag = _item.flags.png;
      this.location = _item.latlng;
      this.countryCode = _item.cca3;
      this.borders = _item.borders;
      this.coin = _item.currencies;
      this.region = _item.region;
    }

    render() {
      classCard();
          let myDiv = document.createElement("div");
      myDiv.className =  "rounded border  text-white ";
      document.querySelector(this.parent).append(myDiv);
      document.querySelector(this.parent).className = "row text-center bg-info  justify-content-center ";
    myDiv.innerHTML =
    ` <img src="${this.flag}" alt="${this.name}" class=" col-3  mx-3 mb-2">
      <h3></strong>${this.name}</strong></h3>
      <div><strong>Population:</strong> ${this.pop} </div>
      <div><strong>Region:</strong> ${this.region}</div>
      <div><strong>Languages:</strong> ${this.languages}</div>
      <div><strong>Coin:</strong>  ${this.renderCoin(this.coin)}</div>      <div><strong>Capital:</strong> ${this.capital}</div>
      <div class="mt-3 " id="id_border"><strong>States with borders:</strong><br>
      <div id="id_borders" class="borders_div"></div>
      </div>
      </div>
      <iframe class="mt-3 col-6 pe-3" height="300" src="https://maps.google.com/maps?q=${this.location[0]},${this.location[1]}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
 `;
      if (this.borders) {
        this.borders.forEach(async (item,index) => {
          if (item != "PSE") {
            let fullName = await this.getNameByCode(item);
            let span = document.createElement("span");
            span.className = "lank";
            span.innerHTML = `${fullName}${index < this.borders.length - 1 ? ',' : '.'} `;
            document.querySelector("#id_borders").append(span);
            span.addEventListener("click", () => {
              this.createCountryByCode(item);
            });
          }
        });
  
  
  
      } else { document.querySelector("#id_borders").innerHTML += "none" }
  
      let btn = myDiv.querySelector("#homebtn")
      btn.addEventListener("click", () => {
        document.querySelector(this.parent).innerHTML = ""
        this.startPreviewCountries();
      
      })
    }
  
    previewRender() {
    let div = document.createElement("div");
    div.className = "col-4 px-3 mt-4 text-center box  ";
    document.querySelector(this.parent).append(div);
    let img = document.createElement("img");
    img.src = this.flag;
    img.alt = this.name;
    img.className="col-10 "
    img.addEventListener("click", () => {
      document.querySelector("#id_parent").innerHTML = "";
      classCard();
      this.render();
    });
    div.append(img);
    let h2 = document.createElement("h2");
    h2.textContent = this.name;
    h2.className = "my-3"
    h2.style.fontWeight = "700";
    div.append(h2);
  
    }
    renderCoin = (currencies) => {
        return Object.entries(currencies)
          .map(([code, currency]) => `${currency.name} ${currency.symbol}`)
          .join(', ');
      }
  }
  