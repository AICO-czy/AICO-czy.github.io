import { getPie3D } from "./pieChart3D";
import { getRing3D } from "./ringchart3D";

/**创建3D饼图 */
export function createPieChart3D(
  pieData: any,
  internalDiameterRatio: number
) {
  var option = getPie3D(pieData, internalDiameterRatio);
  return option;
}

/**创建3D环形饼图 */
export function createRingChart3D(pieData: any, internalDiameterRatio: number) {
  var option = getRing3D(pieData, internalDiameterRatio);
  return option;
}
