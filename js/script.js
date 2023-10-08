window.onload = function () {
  // この中に、ローディングが完全に終わった後の処理を書く
  console.log("ページのすべてのリソースが読み込まれました！");

  // 例: ローディング画面を非表示にする
  const loadingScreen = document.getElementById('loading');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
};

import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const Intro = {
  props: {
    text: String,
    // root であるappのperformersのフィールドにアクセスする
  },
  data: () => ({
    isHovered: false
  }),
  template: `
    <div @mouseover="isHovered = true" @mouseout="isHovered = false">
      <p style="background-color: blue" v-if="isHovered">{{ text || "nothing passed" }}</p>
    </div>
  `
};

const app = createApp({
  components: {
    Intro
  },
  data: () => ({
    performers: []
  }),
  mounted() {
    // Fetch CSV data and parse it
    this.fetchCSVData("./data/artist-info.csv");
    this.fetchArtistImg("./img/artist/");
  },
  methods: {
    fetchCSVData(url) {
      // Fetch the CSV file
      fetch(url)
        .then((response) => response.text())
        .then((csvData) => {
          // Parse CSV
          const performers = this.parseCSV(csvData);
          this.performers = performers;
        });
    },
    parseCSV(csvData) {
      const lines = csvData.split("\n");
      const performers = [];
      // Assuming the CSV structure is: name,image,intro
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",");
        performers.push({
          id: i + 1, // You can assign a unique id if needed
          name: cols[0],
          image: "",
          intro: `${cols[4]}`,
        });
      }

      return performers;
    },
    fetchArtistImg(path) {
      fetch(path)
        .then((response) => response.text())
        .then((files) => {
          for (let performer of this.performers) {
            const index = performer.id - 2;
            const pathId = path + performer.id;
            console.log(pathId);
            if (this.imageExists(pathId + ".webp")) {
              this.performers[index].image = pathId + ".webp";
            }
            else if (this.imageExists(pathId + ".gif")) {
              this.performers[index].image = pathId + ".gif";
            }
            else if (this.imageExists(pathId + ".png")) {
              this.performers[index].image = pathId + ".png";
            }
            else if (this.imageExists(pathId + ".jpg")) {
              this.performers[index].image = pathId + ".jpg";
            }
            else {
              this.performers[index].image = path + "logo.png";
            }
          }
        });
    },
    imageExists(url) {
      const http = new XMLHttpRequest();
      http.open("HEAD", url, false);
      http.send();
      return http.status !== 404;
    }
  },
});

app.mount("#app");
