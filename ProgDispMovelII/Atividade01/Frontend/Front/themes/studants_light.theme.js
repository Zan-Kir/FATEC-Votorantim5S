import { MD3LightTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

export const colors = {
  primary: '#1976D2',
  primaryContainer: '#E3F2FD',
  secondary: '#2196F3',
  secondaryContainer: '#BBDEFB',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F5F5',
  surfaceDisabled: '#E3F2FD',
  background: '#FAFAFA',
  onPrimary: '#FFFFFF',
  onSurface: '#212121',
  onSurfaceVariant: '#212121',
  onSurfaceDisabled: '#212121',
  outline: '#BDBDBD',
  outlineVariant: '#E0E0E0',
  inputDisabled: '#F8FBFF',
  success: '#81C784',
  textSecondary: '#666666',
  matriculaBackground: '#E3F2FD',
  matriculaBorder: '#BBDEFB',
  matriculaText: '#0D47A1',
};

export const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryContainer,
    secondary: colors.secondary,
    secondaryContainer: colors.secondaryContainer,
    surface: colors.surface,
    surfaceVariant: colors.surfaceVariant,
    surfaceDisabled: colors.surfaceDisabled,
    background: colors.background,
    onPrimary: colors.onPrimary,
    onSurface: colors.onSurface,
    onSurfaceVariant: colors.onSurfaceVariant,
    onSurfaceDisabled: colors.onSurfaceDisabled,
    outline: colors.outline,
    outlineVariant: colors.outlineVariant,
  },
};

export const headerStyles = StyleSheet.create({
  header: {
    paddingTop: 40,
    elevation: 4,
    backgroundColor: colors.surface,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  backButton: {
    marginLeft: -8,
    marginRight: 8,
    padding: 8,
    minWidth: 48,
    minHeight: 48,
  },
});

export const cardStyles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 3,
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  studentInfo: {
    flex: 1
  },
  studentName: {
    fontSize: 18,
    marginBottom: 4,
    color: colors.onSurface
  },
  matricula: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: 'monospace',
    fontWeight: '600'
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});

export const inputStyles = StyleSheet.create({
  input: {
    marginBottom: 8,
    backgroundColor: colors.surface
  },
  inputDisabled: {
    backgroundColor: colors.inputDisabled,
  },
});

export const matriculaStyles = StyleSheet.create({
  matriculaContainer: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: colors.matriculaBackground,
    borderWidth: 2,
    borderColor: colors.matriculaBorder,
  },
  matriculaLabel: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  matricula: {
    fontFamily: 'monospace',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.matriculaText
  },
});

export const courseStyles = StyleSheet.create({
  coursesContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: colors.inputDisabled,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryContainer,
  },
  coursesLabel: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
    backgroundColor: colors.primaryContainer,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: colors.inputDisabled,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryContainer,
  },
  checkboxLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.onSurface
  },
  cursoChip: {
    marginBottom: 8,
    backgroundColor: colors.primaryContainer,
    maxWidth: '100%',
  },
  cursoChipText: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
});

export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  scrollContainer: {
    flex: 1,
    padding: 16
  },
  list: {
    padding: 16
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.surface,
    elevation: 3,
    borderWidth: 2,
    borderColor: colors.primaryContainer,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center'
  }
});

export const fabStyles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
    backgroundColor: colors.primary,
  },
});

export const buttonStyles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 16,
    fontWeight: '500'
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32
  },
  saveButton: {
    marginTop: 8,
    borderRadius: 25,
    elevation: 4,
  },
  buttonContent: {
    paddingVertical: 12,
    paddingHorizontal: 24
  }
});

export const addressStyles = StyleSheet.create({
  addressGrid: {
    gap: 8
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16
  },
  addressField: {
    flex: 1,
    padding: 8,
    backgroundColor: colors.inputDisabled,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryContainer,
  },
});

export const textStyles = StyleSheet.create({
  row: {
    marginBottom: 12
  },
  label: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600'
  },
  value: {
    fontSize: 16,
    color: colors.onSurface
  },
  divider: {
    marginVertical: 12,
    backgroundColor: colors.primaryContainer
  },
});

export const emptyCourseStyles = StyleSheet.create({
  emptyCourses: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.inputDisabled,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    borderStyle: 'dashed'
  },
  emptyCourseText: {
    color: colors.primary,
    fontStyle: 'italic',
    fontSize: 14
  }
});