 /**
 * diffUtils.ts
 *
 * 두 마크다운 문자열을 라인 단위로 비교하여 diff 결과를 반환합니다.
 * LCS(Longest Common Subsequence) 기반으로 추가/제거/유지 라인을 구분합니다.
 *
 * 반환 타입:
 *  DiffLine[]
 *   - type: "added"   → 새로 추가된 줄 (초록)
 *   - type: "removed" → 제거된 줄     (빨강)
 *   - type: "equal"   → 변경 없는 줄  (기본)
 */

import { DiffLine } from "../../types/utils/Concepts/diffUtils";

/**
 * LCS 길이 테이블 생성
 */
function buildLCS(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp;
}

/**
 * LCS 테이블로 diff 결과 추출
 */
function traceback(
  dp: number[][],
  a: string[],
  b: string[],
  i: number,
  j: number,
  result: DiffLine[],
): void {
  if (i === 0 && j === 0) return;

  if (i === 0) {
    traceback(dp, a, b, i, j - 1, result);
    result.push({ type: "added", content: b[j - 1] });
  } else if (j === 0) {
    traceback(dp, a, b, i - 1, j, result);
    result.push({ type: "removed", content: a[i - 1] });
  } else if (a[i - 1] === b[j - 1]) {
    traceback(dp, a, b, i - 1, j - 1, result);
    result.push({ type: "equal", content: a[i - 1] });
  } else if (dp[i - 1][j] >= dp[i][j - 1]) {
    traceback(dp, a, b, i - 1, j, result);
    result.push({ type: "removed", content: a[i - 1] });
  } else {
    traceback(dp, a, b, i, j - 1, result);
    result.push({ type: "added", content: b[j - 1] });
  }
}

/**
 * 두 마크다운 문자열을 비교하여 라인 단위 diff 결과를 반환합니다.
 *
 * 재귀 스택 오버플로우 방지를 위해 라인 수가 많을 때는
 * 변경된 부분 주변만 추출하여 반환합니다 (컨텍스트 3줄).
 */
export function computeDiff(original: string, updated: string): DiffLine[] {
  const aLines = original.split("\n");
  const bLines = updated.split("\n");

  // 라인 수가 너무 많으면 재귀 대신 간단한 라인 비교로 폴백
  if (aLines.length > 300 || bLines.length > 300) {
    return simpleDiff(aLines, bLines);
  }

  const dp = buildLCS(aLines, bLines);
  const result: DiffLine[] = [];

  try {
    traceback(dp, aLines, bLines, aLines.length, bLines.length, result);
  } catch {
    // 스택 오버플로우 폴백
    return simpleDiff(aLines, bLines);
  }

  return result;
}

/**
 * 변경된 부분 주변 컨텍스트(3줄)만 표시하는 간략 diff
 * (라인 수가 많은 경우 폴백용)
 */
function simpleDiff(aLines: string[], bLines: string[]): DiffLine[] {
  const result: DiffLine[] = [];
  const maxLen = Math.max(aLines.length, bLines.length);

  for (let i = 0; i < maxLen; i++) {
    const a = aLines[i];
    const b = bLines[i];

    if (a === undefined) {
      result.push({ type: "added", content: b });
    } else if (b === undefined) {
      result.push({ type: "removed", content: a });
    } else if (a === b) {
      result.push({ type: "equal", content: a });
    } else {
      result.push({ type: "removed", content: a });
      result.push({ type: "added", content: b });
    }
  }

  return result;
}

/**
 * diff 결과에서 변경이 있는 라인 주변 컨텍스트만 추출합니다.
 * equal 라인이 너무 많으면 중간을 접어서 변경 부분만 보여줍니다.
 *
 * @param lines    computeDiff 결과
 * @param context  변경 줄 기준 앞뒤로 보여줄 equal 줄 수 (기본 3)
 */
export function collapseContext(lines: DiffLine[], context = 3): DiffLine[] {
  const changed = new Set<number>();
  lines.forEach((l, i) => {
    if (l.type !== "equal") {
      for (
        let k = Math.max(0, i - context);
        k <= Math.min(lines.length - 1, i + context);
        k++
      ) {
        changed.add(k);
      }
    }
  });

  if (changed.size === 0) return []; // 변경 없음

  const result: DiffLine[] = [];
  let skipping = false;

  lines.forEach((line, i) => {
    if (changed.has(i)) {
      skipping = false;
      result.push(line);
    } else {
      if (!skipping) {
        result.push({ type: "equal", content: "···" }); // 생략 표시
        skipping = true;
      }
    }
  });

  return result;
}
