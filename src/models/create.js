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
      const id = await DrawingsAPI.addDrawing(drawing);
      drawing.id = id;
      this.modelApi.setTab(
        { 
          path: "show",
          params: { id: id }
        },
        `show/${id}`
      );
    }
  }
}

decorate(CreateModel, {
  drawings: observable
});
