import GameCatalog from "./GameCatalog";

function GenericCatalog(props) {
  return (
    <div>
      <GameCatalog number={props.number} slice={props.number} query="action" grid={props.grid} order={props.order} />
      <GameCatalog number={props.number} slice={props.number} query="adventure" grid={props.grid} order={props.order} />
      <GameCatalog number={props.number} slice={props.number} query="rpg" grid={props.grid} order={props.order} />
      <GameCatalog number={props.number} slice={props.number} query="shooter" grid={props.grid} order={props.order} />
      <GameCatalog number={props.number} slice={props.number} query="strategy" grid={props.grid} order={props.order} />
    </div>
  );
}

export default GenericCatalog;
