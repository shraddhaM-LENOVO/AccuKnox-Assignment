import React, { useState, useEffect } from "react";
import useStore from "../store/store";

const AddWidgetModal = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("CSPM");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { categories, addWidget, removeWidget } = useStore();
  const [widgetStates, setWidgetStates] = useState({});

  useEffect(() => {
    setWidgetStates(
      categories[selectedCategory].widgets.reduce((acc, widget) => {
        acc[widget.id] = true;
        return acc;
      }, {})
    );
  }, [selectedCategory, categories]);

  const handleConfirm = () => {
    if (title) {
      const newWidget = {
        id: `${selectedCategory}-${title.toLowerCase().replace(/\s+/g, "-")}`,
        title,
        text,
      };
      addWidget(selectedCategory, newWidget);

      setWidgetStates((prevState) => ({
        ...prevState,
        [newWidget.id]: true,
      }));
    }

    Object.keys(widgetStates).forEach((widgetId) => {
      if (!widgetStates[widgetId]) {
        removeWidget(selectedCategory, widgetId);
      }
    });

    onClose();
  };

  const toggleWidgetCheck = (widgetId) => {
    setWidgetStates({
      ...widgetStates,
      [widgetId]: !widgetStates[widgetId],
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-end">
      <div className="bg-white h-full w-2/5 shadow-lg relative">
        <div className="flex bg-blue-900 justify-between">
          <h3 className="text-l font-semibold mb-2 p-2 text-neutral-100">
            Add Widget
          </h3>
          <button
            onClick={onClose}
            className="absolute top-2 right-6 text-xl text-neutral-100 size hover:text-neutral-300"
          >
            &times;
          </button>
        </div>
        <div className="p-4 text-l">
          Personalize your dashboard by adding the following widget
        </div>
        <div className="flex justify-around mb-6 ">
          {["CSPM", "CWPP", "Image", "Ticket"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? " text-black underline font-bold"
                  : "text-black"
              } p-2 rounded w-1/4 hover:font-bold hover:text-blue-900 hover:underline`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-6 p-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
            placeholder="Widget Title"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Widget Text"
          />
        </div>

        <div className="mb-6 p-4">
          <h4 className="font-bold mb-2">Existing Widgets:</h4>
          {categories[selectedCategory].widgets.map((widget) => (
            <div key={widget.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={widgetStates[widget.id]}
                onChange={() => toggleWidgetCheck(widget.id)}
                className="mr-2"
              />
              <span>{widget.title}</span>
            </div>
          ))}
        </div>

        <div className="p-4 flex justify-end space-x-4 absolute bottom-0 right-0">
          <button
            onClick={onClose}
            className="bg-white text-blue-900 border-blue-900 border font-semibold py-2 rounded-2xl px-8 hover:bg-blue-900 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-900 text-white py-2 px-6 hover:bg-white hover:text-blue-900 border-2 font-semibold hover:border-blue-900 rounded-2xl"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;