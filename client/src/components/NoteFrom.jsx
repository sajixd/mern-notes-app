export default function NoteForm({ form, setForm, editingId, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="form-control"
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      ></textarea>

      <button type="submit" className="btn btn-submit">
        {editingId ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
