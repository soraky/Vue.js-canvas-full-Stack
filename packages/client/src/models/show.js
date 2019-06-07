import { decorate, observable } from 'mobx';
import DrawingsAPI from 'src/drawingsapi';
import sleep from 'src/common/sleep';

export default class ShowModel {
  drawing;

  originalDrawing;

  pause;

  contentIndex;

  speed = 1000;

  modelApi;

  constructor(modelApi) {
    this.modelApi = modelApi;
  }

  async init(urlParams) {
    const drawing = await DrawingsAPI.getDataById(urlParams.id);
    this.drawing = drawing;
    this.originalDrawing = drawing;
  }

  async handleRedraw() {
    this.pause = false;

    const content = [];

    this.drawing = {
      ...this.drawing,
      content,
    };

    for (let index = 0; (index < this.originalDrawing.content.length) && (!this.pause); index++) {
      const currentStroke = this.originalDrawing.content[index];
      await sleep(this.speed);
      if (!this.pause) {
        this.contentIndex = index;
        content.push(currentStroke);
      }
    }

    this.drawing = {
      ...this.drawing,
      content,
    };
  }

  handlePause() {
    this.pause = true;
  }

  async handlePlay() {
    if (this.pause) {
      this.pause = false;

      const content = this.drawing.content;

      for (let index = this.contentIndex + 1; (index < this.originalDrawing.content.length) && (!this.pause); index++) {
        const currentStroke = this.originalDrawing.content[index];
        await sleep(this.speed);
        if (!this.pause) {
          this.contentIndex = index;
          content.push(currentStroke);
        }
      }

      this.drawing = {
        ...this.drawing,
        content,
      };
    }
  }

  handleSpeed(speed) {
    this.speed = speed;
  }

  handleEdit() {
    this.handlePause();
    this.modelApi.setTab(
      {
        path: 'create',
        params: { drawing: this.drawing },
      },
      'create',
    );
  }
}

decorate(ShowModel, {
  drawing: observable,
});
