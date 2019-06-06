import { action, decorate, observable } from "mobx";
import DrawingsAPI from "@/drawingsapi";

export default class CreateModel {
  drawings;

  async init() {
  }

  handleSave(drawing) {
    DrawingsAPI.addDrawing(drawing);
  }
}

decorate(CreateModel, {
  drawings: observable
});
