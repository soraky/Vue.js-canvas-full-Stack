import { action, decorate, observable } from "mobx";
import HomeModel from "./home";
import CreateModel from "./create";
import ShowModel from "./show";

export default class AppModel {
  ready = false;
  currentTab;
  currentModel;
  routeChangedFromModel;

  constructor({ initialTab, routeChangedFromModel }) {
    this.currentTab = initialTab;
    this.routeChangedFromModel = routeChangedFromModel;
    this.afterTabChange();
  }

  setTab(newTab) {
    this.currentTab = newTab;
    this.afterTabChange();
  }

  setReady(ready) {
    this.ready = ready;
  }

  async afterTabChange() {
    this.setReady(false);

    let Model;

    switch (this.currentTab.path) {
      case "home":
        Model = HomeModel;
        break;
      case "create":
        Model = CreateModel;
        break;
      case "show":
        Model = ShowModel;
        break;
    }

    const self = this;

    this.setCurrentModel(
      new Model({
        setTab: (newTab, newRoute) => {
          self.setTab(newTab);
          self.routeChangedFromModel(newRoute);
        }
      })
    );

    await this.currentModel.init(this.currentTab.params);
    this.setReady(true);
  }

  setCurrentModel(newModel) {
    this.currentModel = newModel;
  }
}

decorate(AppModel, {
  setTab: action,
  setReady: action,
  currentTab: observable,
  ready: observable,
});
