
export default function CategoryForm(){
  return(
    <>
      <h2>Criar Categoria</h2>
      <form action="/categories/create" method="POST">
        <label htmlFor="name">Nome da Categoria:</label>
        <input type="text" id="name" name="name" required />

        <button type="submit">Criar</button>
      </form>
    </>
  )
}
