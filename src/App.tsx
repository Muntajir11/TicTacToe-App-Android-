import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';
import {Pressable} from 'react-native';
import Sound from 'react-native-sound';
import GameIcon from './components/GameIcon';
import Instructions from './components/Instructions';

const App = () => {
  const [isCross, setIsCross] = React.useState<boolean>(false);
  const [gameWinner, setGameWinner] = React.useState<string>('');
  const [gameState, setGameState] = React.useState(
    new Array(9).fill('empty', 0, 9),
  );

  const playWinSound = () => {
    const winSound = new Sound('winner', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      winSound.play(() => {
        winSound.release(); // Release the sound resource when done.
      });
    });
  };

  const playDraw = () => {
    const winSound = new Sound('draw', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      winSound.play(() => {
        winSound.release(); // Release the sound resource when done.
      });
    });
  };

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      playWinSound();
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      playWinSound();
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      playWinSound();
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      playWinSound();
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      playWinSound();
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      playWinSound();
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      playWinSound();
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      playWinSound();
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      playDraw();
      setGameWinner('Draw game... ⌛️');
    }
  };

  const onChangingItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: 'Game Winner',
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Already filled',
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }

    checkIsWinner();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <View>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Tic Tac Toe </Text>
          <GameIcon />
        </View>

        {gameWinner ? (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerTxt}>{gameWinner} </Text>
          </View>
        ) : (
          <View
            style={[
              styles.playerInfo,
              isCross ? styles.playerX : styles.playerO,
            ]}>
            <Text style={styles.gameTurnTxt}>
              Player {isCross ? 'X' : 'O'} Turn
            </Text>
          </View>
        )}

        <FlatList
          numColumns={3}
          nestedScrollEnabled={true}
          data={gameState}
          style={styles.grid}
          renderItem={({item, index}: {item: string; index: number}) => (
            <Pressable
              key={index}
              style={styles.card}
              onPress={() => onChangingItem(index)}>
              <Icons name={item} />
            </Pressable>
          )}
        />

        <Pressable style={styles.gameBtn} onPress={reloadGame}>
          <Text style={styles.gameBtnText}>
            {gameWinner ? 'Start new game' : 'Restart game'}
          </Text>
        </Pressable>

      </View>
        <ScrollView
          style={styles.instructionsContainer}
          contentContainerStyle={{flexGrow: 1}} // Ensure proper scrolling behavior
        >
          <Instructions />
         
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  headerView: {
    height: 56,
    flexDirection: 'row',
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8D3DAF',
  },

  instructionsContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 4,

    shadowColor: '#333',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexGrow: 1,
  },
});

export default App;
