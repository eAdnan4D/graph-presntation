export function isSameAsReverse(str1, str2) {
  let reversed = "";
  for(let i = str1.length - 1; i >= 0; --i) {
    reversed += str1[i];
  }
  if(reversed==str2) return true;
  return false;
}

export function isValidGraph(graph) {
  const nodes = Object.keys(graph);
  const objNodes = {};
  // transfer the array into object to make access better than looping over array
  nodes.forEach((node) => {
    objNodes[node] = 1;
  })
  let isValid = true;
  nodes.forEach((node) => {
    if(isValid) {
      const adjNodes = graph[node]
      for(let i = 0; i < adjNodes.length; ++i) {
        if(!objNodes[adjNodes[i][0]]) {
          isValid = false;
          break;
        }
      }
    }
  })

  return isValid;
}

export function isDirect(graph, nodes) {
  let notDirect = true;
  nodes.forEach((node) => {
    if (notDirect) {
      const path = graph[node]; // node = A => all nodes can A go to
      path.forEach((adjNode) => {
        // adjNode[0] => first node can A go to...
        const nodePath = graph[adjNode[0]];
        // console.log(nodePath)
        if (!nodePath) {
          notDirect = false;
          return; // if the path didn't exist in first place then terminate
        }
        // if the node exist then check all nodes that can vist
        let found = true;
        for (let i = 0; i < nodePath.length; i++) {
          if (nodePath[i][0] == node) break; // if found then don't go any further
          else if (nodePath[i][0] != node && i == nodePath.length - 1)
            found = false;
        }
        if (!found) notDirect = false;
      });
    }
  });

  return notDirect
}

export function distributeNodes(raduis, lengthForSide, nodesCount) {
  const centerX = (lengthForSide / 4 ) - 25;
  const centerY = (lengthForSide / 4 ) - 25;

  const points = []
  for (let k = 0; k < nodesCount; k++) {
    const angle = k * (2 * Math.PI / nodesCount); // to get the angel in rad for each side
    const x = centerX + raduis * Math.cos(angle); // the distance between center and node is r and add to it the center coordinate
    const y = centerY + raduis * Math.sin(angle);
    points.push({x, y})
  }

  return points
}

export function distributeEdges(graph, nodesCoordinate) {
  const nodes = Object.keys(graph);
  const presented = {} // To know if the path between two nodes already presented
  const edges = [] // Final answer
  let totalCost = 0

  nodes.forEach((node) => {
  const path = graph[node]
  path.forEach((adjNode) => {
      const [title, weight] = adjNode;
      const id = node + "," + title; // Comma to know what is first node and what is second node
      const reversedId = title + "," + node;
      // Because it's not direct
      if(!presented[id] || !presented[reversedId]) {
        // Manhatan distance
        const manEdgeLen = Math.abs(nodesCoordinate[node]?.x - nodesCoordinate[title]?.x) + Math.abs(nodesCoordinate[node]?.y - nodesCoordinate[title]?.y)
        // Euclidean Distance
        const deltaX = nodesCoordinate[node]?.x - nodesCoordinate[title]?.x;
        const deltaY = nodesCoordinate[node]?.y - nodesCoordinate[title]?.y;
        const EucEdgeLen = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        const angelRad = Math.atan2(deltaY, deltaX); // acrtan of two points will return the angel between them (radians)
        const angelDeg = angelRad * (180 / Math.PI); // the angel in degree
        const edge = {
          startX: nodesCoordinate[node]?.x,
          endX: nodesCoordinate[title]?.x,
          startY: nodesCoordinate[node]?.y,
          endY: nodesCoordinate[title]?.y,
          from: node,
          to: title,
          manLen: manEdgeLen,
          eucLen: EucEdgeLen, // More Accurate
          angelRad,
          angelDeg,
        }
        edges.push(edge);
        // Mark this relation as visited
        presented[id] = weight;
        presented[reversedId] = weight;
        totalCost += weight;
      }
    });
  });

  return {edges, presented, totalCost}
}