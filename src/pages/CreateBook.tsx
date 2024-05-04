import createSign from "../lib/createSign";

export default function CreateBook() {

  const handleCreateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const key = localStorage.getItem("userKey") as string;
    const secret = localStorage.getItem("userSecret") as string;
    const method = "POST";
    const url = "/books";
    const body = JSON.stringify(data);

    const sign = createSign(method, url, body, secret);

    try {
      const response = await fetch(`https://no23.lavina.tech${url}`, {
        method,
        headers: {
          Key: key,
          Sign: sign,
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Create a book</h1>
      <form onSubmit={handleCreateBook}>
        <input name="title" type="text" placeholder="title" />
        <input name="cover" type="text" placeholder="cover" />
        <input name="isbn" type="text" placeholder="isbn" />
        <input name="author" type="text" placeholder="author" />
        <input name="published" type="number" placeholder="published" />
        <input name="pages" type="number" placeholder="pages" />
        <button>Create</button>
      </form>
    </div>
  )
}
