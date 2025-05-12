function CapsLock(propriedades) {
  console.log(propriedades);
}

export default function StatusPage() {
  return (
    <div>
      <center>
        <h1 style={{ color: "white" }}>Status</h1>
      </center>
      <CapsLock texto="teste de texto" />
      <body bgcolor="#007BFF"></body>
    </div>
  );
}
