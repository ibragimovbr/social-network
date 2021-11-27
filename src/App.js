import React, { Suspense } from "react";
import { Route } from "react-router";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import News from "./components/News/News.jsx";
import Music from "./components/Music/Music.jsx";
import Settings from "./components/Settings/Settings.jsx";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import { initializeApp } from "./redux/app-reducer";
import { connect } from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
const DialogsContainer = React.lazy(() =>
   import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
   import("./components/Profile/ProfileContainer")
);
class App extends React.Component {
   componentDidMount() {
      this.props.initializeApp();
   }
   render() {
      return (
         <div className="app-wrapper">
            <HeaderContainer />
            <Navbar />
            <Suspense fallback={<Preloader />}>
               <div className="app-wrapper-content">
                  <Route
                     path="/profile/:userId?"
                     render={() => <ProfileContainer />}
                  />
                  <Route path="/dialogs" render={() => <DialogsContainer />} />
                  <Route path="/news" render={() => <News />} />
                  <Route path="/music" render={() => <Music />} />
                  <Route path="/settings" render={() => <Settings />} />
                  <Route path="/users" render={() => <UsersContainer />} />
                  <Route path="/login" render={() => <Login />} />
               </div>
            </Suspense>
         </div>
      );
   }
}
const mapStateToProps = (state) => {
   return {
      initialized: state.app.initialized,
   };
};
export default connect(mapStateToProps, { initializeApp })(App);
