function ExhibitionForm({ formData, handleInput, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="save-exhibition-form">
      <label htmlFor="title">
        Title:
        <br />
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleInput}
          required
          placeholder="Enter an exhibition title"
          maxLength={50}
        />
      </label>
      <label htmlFor="description">
        Description:
        <br />
        <textarea
          name="description"
          id="description"
          onChange={handleInput}
          value={formData.description}
          placeholder="Enter an exhibition description"
          maxLength={250}
          rows={10}
        ></textarea>
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default ExhibitionForm;
