import "./App.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./UserProvider";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <div>první</div>
      <div style={{ height: "300px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor
        metus posuere nulla feugiat, non vulputate nisi pretium. Donec a nulla
        id orci hendrerit luctus nec in ante. Pellentesque auctor erat a nunc
        iaculis, a sodales lorem varius. Maecenas dignissim eu velit non tempus.
        Donec accumsan enim a varius dignissim. Morbi arcu elit, laoreet
        facilisis varius et, porta eget orci. In efficitur nisi sit amet nisi
        mollis faucibus nec vitae sem. Vivamus at volutpat lacus, et facilisis
        dolor. Sed id ligula nec ante porta suscipit. Pellentesque euismod elit
        eu aliquam egestas. Proin id fermentum tortor. Aliquam maximus ex nec
        velit luctus, a mollis magna viverra. Phasellus posuere mi pellentesque
        purus maximus, ac convallis metus dapibus. Duis eleifend orci imperdiet
        ullamcorper eleifend. Sed fringilla hendrerit ligula in finibus.
        Suspendisse porttitor mi nunc, nec hendrerit erat finibus pretium.
        Mauris at tincidunt tortor, vitae faucibus mauris. Mauris orci turpis,
        consectetur ac justo ut, fringilla eleifend justo. Duis vitae lorem
        elementum mauris ornare dapibus ac quis magna. Aliquam bibendum
        facilisis felis quis ultricies. Aenean est purus, suscipit eget volutpat
        quis, commodo vitae leo. Maecenas condimentum, nisi eget mattis cursus,
        lacus nisl aliquam ante, at tristique neque nulla a enim. Integer eu
        fringilla purus. Aenean tempus ex ut turpis faucibus, a feugiat quam
        ullamcorper. Nulla et ex arcu. Quisque mattis ex id quam varius
        facilisis. Aliquam pretium enim mauris, a mattis sapien convallis a.
        Nullam varius magna venenatis arcu porttitor placerat nec et felis.
        Nulla ut nisl viverra, blandit metus quis, congue tortor. Aenean eget
        arcu porta, mollis nunc et, faucibus magna. Nunc in ipsum id libero
        vestibulum scelerisque sit amet sed magna. Phasellus sagittis luctus
        augue non mattis. Donec porttitor varius velit. Nulla eleifend, libero
        vel sagittis bibendum, velit nibh consectetur lectus, placerat blandit
        risus risus et augue. Curabitur aliquam volutpat nisi a ornare. Praesent
        vitae ex et dolor hendrerit tempor ut quis diam. Integer dignissim,
        augue eu egestas scelerisque, sapien lacus sollicitudin nisl, vel auctor
        nulla neque ac ante. Suspendisse ut magna lacus. Pellentesque venenatis
        egestas lorem, sed sollicitudin diam tempor sed. Integer vitae nibh
        nisi.
      </div>
      <div>třetí</div>
      {/* <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider> */}
    </div>
  );
}

export default App;
