import { decorate, observable } from "mobx";
import DrawingsAPI from "@/drawingsapi";

export default class CreateModel {
  drawings;
  drawing;
  modelApi;

  constructor(modelApi) {
    this.modelApi = modelApi;
  }

  async init(urlParams) {
    if (urlParams.drawing == undefined) {
      this.drawing = [];
    }
    else {
      this.drawing = urlParams.drawing;
    }
  }

  async handleSave(drawing) {
    if (drawing.content.length == 0) {
      alert("The drawing is empty!")
    }
    else {
      DrawingsAPI.addDrawing(drawing);
      const id = DrawingsAPI.addDrawing(drawing);
      drawing.id = id;
      this.modelApi.setTab(
        { 
          path: "show",
          params: { id: 4 }
        },
        `show/${"4"}`
      );
    }
  }
}

decorate(CreateModel, {
  drawings: observable
});
