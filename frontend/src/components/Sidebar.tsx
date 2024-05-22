const Sidebar = () => {
  const onDragStart = (event, nodeType: string, functionName: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType, functionName);
    event.dataTransfer.effectAllowed("move");
  };

  return (
    <aside>
      <div className="description">Workflow Nodes</div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Start", "startFunction")}
        draggable
      >
        Start
      </div>
      <div
        className="dndnode"
        onDragStart={(event) =>
          onDragStart(event, "Filter Data", "filterDataFunction")
        }
        draggable
      >
        Filter Data
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "Wait", "waitFunction")}
        draggable
      >
        Wait
      </div>
      <div
        className="dndnode"
        onDragStart={(event) =>
          onDragStart(event, "Convert Format", "convertFormatFunction")
        }
        draggable
      >
        Convert Format
      </div>
      <div
        className="dndnode"
        onDragStart={(event) =>
          onDragStart(event, "Send POST Request", "sendPostReqFunction")
        }
        draggable
      >
        Send POST Request
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "End", "endFunction")}
        draggable
      >
        End
      </div>
    </aside>
  );
};

export default Sidebar;
