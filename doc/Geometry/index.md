<!-- markdownlint-disable -->

# @technobuddha/library

## Geometry

### Angle

| Name | Description |
| ------ | ------ |
| [AngleUnit](AngleUnit.md) | Types of angle units |
| [angleUnits](angleUnits.md) | Number of units in a circle |unit|value| |---|---| |deg|360| |degrees|360| |rads|2π| |radians|2π| |grads|400| |gradians|400| |turns|1| |
| [angleBetweenPoints](angleBetweenPoints.md) | Computes the angle between two points (x1,y1) and (x2,y2). Angle zero points in the +X direction, π/2 radians points in the +Y direction (down) and from there we grow clockwise towards π*2 radians. |
| [angleDifference](angleDifference.md) | Computes the difference between startAngle and endAngle. |
| [angleOfLine](angleOfLine.md) | Calculates the angle of a given line segment, relative to the horizontal axis |
| [angleReflection](angleReflection.md) | Calculates the reflection of an angle across a specified axis. |
| [normalizeAngle](normalizeAngle.md) | Normalizes an angle to be in range [0-π*2]. Angles outside this range will be normalized to be the equivalent angle with that range. |
| [toAngle](toAngle.md) | Converts an angle from one unit to another. |
| [toDegrees](toDegrees.md) | Convert an angle from radians to degrees |
| [toRadians](toRadians.md) | Converts degrees to radians. |

### Coordinates

| Name | Description |
| ------ | ------ |
| [Cartesian](Cartesian.md) | Represents a point in 2D Cartesian coordinate space. |
| [Polar](Polar.md) | Polar coordinate (angle, radius) |
| [Origin](Origin.md) | The origin of cartesian coordinates (0, 0) |
| [isCartesian](isCartesian.md) | Determines if the provided value is a Cartesian point. |
| [isPolar](isPolar.md) | Determines if the provided value is a Polar point. |
| [toCartesian](toCartesian.md) | Convert polar coordinates to cartesian |
| [toPolar](toPolar.md) | Convert cartesian coordinates to polar |

### Line Segment

| Name | Description |
| ------ | ------ |
| [LineSegment](LineSegment.md) | Represents a line segment in 2D space, defined by its start and end points. |
| [angleOfLine](angleOfLine.md) | Calculates the angle of a given line segment, relative to the horizontal axis |
| [isIntersecting](isIntersecting.md) | Determines whether a given shape (either a LineSegment or a Polygon) intersects with a polygon. |
| [isLeftOfLine](isLeftOfLine.md) | Determines whether a given point lies to the left of a specified line segment. |
| [isOnLine](isOnLine.md) | Determines whether a given point lies on a specified line segment within a certain tolerance. |
| [isWithLine](isWithLine.md) | Determines whether a given point lies on a specified line segment within a certain tolerance. |
| [lineIntersection](lineIntersection.md) | Calculates the intersection point of two line segments. |
| [lineLength](lineLength.md) | Calculates the length of a given line segment using the distance formula. |
| [midpoint](midpoint.md) | Calculates a point at a given fraction (`part`) along a line segment. By default it returns the true midpoint of the line segment |
| [normalizeLineSegment](normalizeLineSegment.md) | Returns a `LineSegment` where the point with the higher y-coordinate is always the starting point (x0, y0). If the original line's y1 is greater than y0, the line is returned as-is. Otherwise, the start and end points are swapped. |

### Point

| Function | Description |
| ------ | ------ |
| [isInPolygon](isInPolygon.md) | Determines whether a given point or rectangle is inside or on the edge of a polygon. |
| [isLeftOfLine](isLeftOfLine.md) | Determines whether a given point lies to the left of a specified line segment. |
| [isOnLine](isOnLine.md) | Determines whether a given point lies on a specified line segment within a certain tolerance. |
| [isWithLine](isWithLine.md) | Determines whether a given point lies on a specified line segment within a certain tolerance. |
| [manhattanDistance](manhattanDistance.md) | Calculates the Manhattan distance between two points in Cartesian coordinates. |
| [rotate](rotate.md) | Rotates a point or an array of points around a given origin by a specified angle. |
| [scale](scale.md) | Scales a point or a polygon of points around a given origin by a specified amount. |
| [translate](translate.md) | Translate a point or an array of points by a specified amount. |

### Polygon

| Name | Description |
| ------ | ------ |
| [Polygon](Polygon.md) | A polygon (a set of cartesian coordinates) |
| [area](area.md) | Calculates the area of a polygon given its vertices. |
| [bounds](bounds.md) | Calculates the axis-aligned bounding rectangle for a given polygon. |
| [centroid](centroid.md) | Calculates the centroid (geometric center) of a polygon given its vertices. |
| [convexHull](convexHull.md) | Computes the convex hull of a set of 2D points using the Monotone Chain algorithm. |
| [edgeAngles](edgeAngles.md) | Generate normalized edge angles from polygon edges. |
| [isInPolygon](isInPolygon.md) | Determines whether a given point or rectangle is inside or on the edge of a polygon. |
| [isIntersecting](isIntersecting.md) | Determines whether a given shape (either a LineSegment or a Polygon) intersects with a polygon. |
| [largestInscribedRectangle](largestInscribedRectangle.md) | Computes the largest rectangle that can be inscribed within the given polygon. |
| [perimeter](perimeter.md) | Calculates the perimeter of a polygon given its vertices. |
| [regularPolygon](regularPolygon.md) | Generates the vertices of a regular polygon as an array of Cartesian points. |
| [rotate](rotate.md) | Rotates a point or an array of points around a given origin by a specified angle. |
| [scale](scale.md) | Scales a point or a polygon of points around a given origin by a specified amount. |
| [star](star.md) | Generates the vertices of a star-shaped polygon. |
| [toPolygon](toPolygon.md) | Converts two Cartesian points or a rectangle into a `Polygon` object. |
| [translate](translate.md) | Translate a point or an array of points by a specified amount. |

### Rectangle

| Name | Description |
| ------ | ------ |
| [LargestInscribedRectangleOptions](LargestInscribedRectangleOptions.md) | Configuration options for the largest inscribed rectangle algorithm. |
| [Rect](Rect.md) | A rectangle (defined by its top-left corner, width and height) |
| [RotatedRect](RotatedRect.md) | Represents a rectangle that has been rotated by a certain angle. Extends the `Rect` type with additional properties for the area and rotation angle. |
| [isRect](isRect.md) | Determines if the provided value is a Rectangle. |
| [largestInscribedRectangle](largestInscribedRectangle.md) | Computes the largest rectangle that can be inscribed within the given polygon. |
| [toSquare](toSquare.md) | Converts a given rectangle to the largest possible square that fits within it, centered along the longer dimension. If the rectangle is already a square, it returns the original rectangle. |
