import styled from "styled-components";

const StyledProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  margin-bottom: 10px;
`;

const ColorBar = styled.span.attrs<ProgressBarProps>(({ length }) => ({
  style: { width: `${length}%` },
}))<ProgressBarProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(90deg, #4ba8ec 0%, #0f57c2 100%);
  border-radius: 3px;
`;

const Cursor = styled.span.attrs(({ length }: ProgressBarProps) => ({
  style: { left: `${length}%` },
}))<ProgressBarProps>`
  position: absolute;
  bottom: -1px;
  width: 6px;
  transform: translateX(-50%);
  height: 6px;
  background-color: #000;
  border-radius: 50%;
  z-index: 1;
`;

interface ProgressBarProps {
  length: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <StyledProgressBar>
      <ColorBar {...props} />
      <Cursor {...props} />
    </StyledProgressBar>
  );
}
