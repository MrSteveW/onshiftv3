export default function Index({ shiftpatterns }) {
    return (
        <div>
            <div>See all shift patterns for ____ person</div>
            <div>{JSON.stringify(shiftpatterns)}</div>
        </div>
    );
}
