// export default function PostForm({ categories = [] }) {
  export default function EditPostForm() {
  return (
    <>
      <h2>Criar Post</h2>
      <form action="/posts/create" method="POST" encType="multipart/form-data">
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" required />

        <label htmlFor="content">Conteúdo:</label>
        <textarea id="content" name="content"></textarea>

        <label htmlFor="imageUrl">Imagem (URL):</label>
        <input type="text" id="imageUrl" name="imageUrl" />

        <label htmlFor="audioUrl">Áudio (URL):</label>
        <input type="text" id="audioUrl" name="audioUrl" />

        <label htmlFor="videoUrl">Vídeo (URL):</label>
        <input type="text" id="videoUrl" name="videoUrl" />

        <label htmlFor="categoryId">Categoria:</label>
        <select name="categoryId" id="categoryId">
          <option value="">Nenhuma</option>
          {/* {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))} */}
        </select>

        <label>
          <input type="checkbox" name="published" />
          Publicado
        </label>

        <button type="submit">Criar</button>
      </form>
    </>
  );
}
