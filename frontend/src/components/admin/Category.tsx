import { useNavigate } from "react-router-dom";
import "../../components/admin/Inventory.css"; // Reuse your existing styles

const Category = () => {
  const navigate = useNavigate();

  // Sample empty array — this will be replaced with backend data
  const categories: { id: number; name: string }[] = [];

  const handleAdd = () => {
    navigate("/category/add");
  };

  return (
    <div className="inventory-table-container">
      <h2>Category List</h2>

      <div className="right-controls" style={{ marginBottom: "10px" }}>
        <button className="add-button" onClick={handleAdd}>
          Add Category
        </button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No categories available.
              </td>
            </tr>
          ) : (
            categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    className="btn show"
                    onClick={() => navigate(`/category/show/${category.id}`)}
                  >
                    Show
                  </button>
                  <button
                    className="btn update"
                    onClick={() =>
                      navigate(`/category/update/${category.id}`, {
                        state: category,
                      })
                    }
                  >
                    Update
                  </button>
                  <button
                    className="btn delete"
                    onClick={() =>
                      navigate(`/category/delete/${category.id}`, {
                        state: category,
                      })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
