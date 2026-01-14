export function authGate() {
  const PASSWORD = "cqh896az239@#";

  const saved = localStorage.getItem("staging_auth");
  if (saved === "ok") return;
console.log("PROD DEPLOY CONFIRMED");
  document.documentElement.innerHTML = `
    <head>
      <title>Staging Access</title>
    </head>
    <body style="
      margin:0;
      height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#0f172a;
      color:white;
      font-family:sans-serif;
    ">
      <div style="text-align:center">
        <h2>Staging Access</h2>
        <input id="pass" type="password" placeholder="Password"
          style="padding:10px;width:220px;margin-top:10px"/>
        <br/><br/>
        <button id="btn" style="padding:10px 20px">Enter</button>
        <p id="err" style="color:#f87171"></p>
      </div>
    </body>
  `;

  document.getElementById("btn").onclick = () => {
    const val = document.getElementById("pass").value;
    if (val === PASSWORD) {
      localStorage.setItem("staging_auth", "ok");
      location.reload();
    } else {
      document.getElementById("err").innerText = "Wrong password";
    }
  };
}
