/* Theme variables */
import coursesIcon from "@assets/icons/cast_for_education.svg";
import "./theme/variables.css";
import appContent from "@content/app.json";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {Bookmarks} from "@pages/bookmarks";
import Courses from "@pages/courses/Courses";
// import {Downloads} from "@pages/downloads";
import {Home} from "@pages/home";
import Settings from "@pages/settings";
import {bookmark, download, home, settings} from "ionicons/icons";
import React from "react";
import {Redirect, Route} from "react-router-dom";
import "./App.css";
import {ArticleDetails} from "@pages/article-details/ArticleDetails";

setupIonicReact();

// @ts-ignore
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/article">
            {/*@ts-ignore*/}
            <ArticleDetails />
          </Route>
          <Route exact path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          {/*<Route exact path="/downloads">*/}
          {/*  <Downloads />*/}
          {/*</Route>*/}
          <Route exact path="/courses">
            <Courses />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>{appContent.home}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="bookmarks" href="/bookmarks">
            <IonIcon aria-hidden="true" icon={bookmark} />
            <IonLabel>{appContent.bookmarks}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon aria-hidden="true" icon={settings} />
            <IonLabel>{appContent.settings}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="downloads" href="/downloads">
            <IonIcon aria-hidden="true" icon={download} />
            <IonLabel>{appContent.downloads}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="courses" href="/courses">
            <IonIcon aria-hidden="true" icon={coursesIcon} />
            <IonLabel>{appContent.courses}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
