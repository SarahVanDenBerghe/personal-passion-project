import React, { useEffect } from 'react';
import { useSpring, a, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { ROUTES } from '../../../../consts';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../hooks';
import { useHistory } from 'react-router';

// https://codesandbox.io/s/usespring-react-hook-forked-k40ut?file=/src/index.js

const height = 350;

const SidebarMobile = ({ children, active, setActive }) => {
  const { treeId } = useParams();
  const history = useHistory();
  const { baublesStore } = useStore();
  const [{ y }, set] = useSpring(() => ({ y: height }));

  const open = ({ canceled }) => {
    set({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff });
  };

  const close = (velocity = 0) => {
    baublesStore.removeBaubleFromUser();
    history.push(ROUTES.tree.to + treeId);
    set({ y: height, immediate: false, config: { ...config.stiff, velocity } });
  };

  useEffect(() => {
    setActive(true);
    open({ canceled: false });
  }, []);

  const bind = useDrag(
    ({ last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
      if (my < -70) cancel();
      if (last) {
        my > height * 0.5 || vy > 0.5 ? close(vy) : open({ canceled });
      } else set({ y: my, immediate: true });
    },
    { initial: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
  );

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  return (
    <>
      <a.div className={styles.sheet} {...bind()} style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}>
        {children}
      </a.div>
    </>
  );
};

export default SidebarMobile;

// https://codesandbox.io/s/action-sheet-zuwji?file=/src/index.js:258-295
