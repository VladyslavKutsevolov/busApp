import React, { PureComponent } from "react";
import { CanvasOverlay } from "react-map-gl";

export default class PolylineOverlay extends PureComponent {
  _redraw({ width, height, ctx, isDragging, project, unproject }) {
    const {
      color = "red",
      lineWidth = 2,
      renderWhileDragging = true,
      allRoutes,
      route
    } = this.props;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    const coordPoints = [];
    const getSingleRouteCoordiantes = () => {
      let findPonts = allRoutes
        .filter(singleRoute => {
          let getInput =
            singleRoute.route_short_name + "-" + singleRoute.route_long_name;
          return getInput === route;
        })
        .map(route => route.multiline.coordinates);
      coordPoints.push(findPonts);
    };

    if (renderWhileDragging || !isDragging) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.beginPath();
      getSingleRouteCoordiantes();
      let finalPoints = coordPoints.flat(3);
      finalPoints.forEach(point => {
        const pixel = project([point[0], point[1]]);
        ctx.lineTo(pixel[0], pixel[1]);
      });
      ctx.stroke();
    }
  }

  render() {
    return <CanvasOverlay redraw={this._redraw.bind(this)} />;
  }
}
