// import { useState, useEffect } from "react";
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import axios from "axios";
// import Markdown from "react-markdown";
// import "./App.css";
// const App = () => {
//   useEffect(() => {
//     prism.highlightAll();
//   }, []);

//   const [code, setCode] = useState(` function sum(){
//                 return 1+1
//                 }`);

//   const [reviews, setReviews] = useState(``);
//   const sendCode = async () => {
//     try {
//       const response = await axios.post(`http://localhost:3000/ai/get-review`, {
//         code,
//       });

//       console.log(response.data);
//       setReviews(response.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   return (
//     <>
//       <main>
//         <div className="left">
//           <div className="code">
//             <Editor
//               value={code}
//               onValueChange={(code) => setCode(code)}
//               highlight={(code) =>
//                 prism.highlight(code, prism.languages.javascript, "javascript")
//               }
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 16,
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//                 height: "100%",
//                 width: "100%",
//               }}
//             />
//           </div>
//           <div className="review" onClick={sendCode}>
//             Review
//           </div>
//         </div>
//         <div className="right">
//           <Markdown>{reviews.response}</Markdown>
//         </div>
//       </main>
//     </>
//   );
// };

// export default App;

import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "prismjs/components/prism-javascript";

import axios from "axios";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const [loading, setLoading] = useState(false);
  async function reviewCode() {
    // setLoading(true);
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/get-review`,
        {
          code,
        }
      );
      setReview(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          {/* <div onClick={reviewCode} className="review">
            Review
          </div> */}
          <div
            className="review"
            onClick={loading ? null : reviewCode}
            onTouchStart={loading ? null : reviewCode}
          >
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>
        <div className="right markdown-body">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review.response}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
